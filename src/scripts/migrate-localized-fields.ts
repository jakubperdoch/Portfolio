/**
 * One-off data migration for the EN/SK rollout.
 *
 * Marking an existing field `localized: true` changes how Payload stores it in
 * MongoDB: a plain `title: "Foo"` becomes `title: { en: "Foo", sk: "…" }`.
 * Documents written before the change still hold the plain shape, and Payload
 * reads them as empty. This script rewrites them in place.
 *
 * It does two things:
 *   1. Wraps plain values of newly-localized fields into `{ [SOURCE_LOCALE]: value }`.
 *   2. Backfills the default locale of fields that were *already* localized
 *      (`Projects.content`, `Faqs.question/answer`) from BACKFILL_FROM, because
 *      the Payload `defaultLocale` moved from `sk` to `en` and an empty default
 *      locale has nothing left to fall back to.
 *
 * Dry run (default, writes nothing):
 *   pnpm payload run src/scripts/migrate-localized-fields.ts
 * Apply:
 *   APPLY=1 pnpm payload run src/scripts/migrate-localized-fields.ts
 *
 * Override which locale existing copy belongs to (default `en`):
 *   SOURCE_LOCALE=sk APPLY=1 pnpm payload run src/scripts/migrate-localized-fields.ts
 */
import mongoose from "mongoose";

import { locales, defaultLocale } from "../i18n/routing.js";

const APPLY = process.env.APPLY === "1";
const SOURCE_LOCALE = process.env.SOURCE_LOCALE ?? defaultLocale;
const BACKFILL_FROM = process.env.BACKFILL_FROM ?? "sk";

type ArrayFieldPlan = { array: string; fields: string[] };

type CollectionPlan = {
  collection: string;
  /** Fields that just became localized. */
  newlyLocalized?: string[];
  /** Localized fields nested inside a non-localized array. */
  nestedInArray?: ArrayFieldPlan[];
  /** Fields that were already localized before this change. */
  alreadyLocalized?: string[];
};

const PLAN: CollectionPlan[] = [
  {
    collection: "projects",
    newlyLocalized: ["title", "description"],
    alreadyLocalized: ["content"],
  },
  {
    collection: "experience",
    newlyLocalized: ["role", "description", "location", "customLabel", "responsibilities"],
  },
  {
    collection: "skills",
    nestedInArray: [{ array: "items", fields: ["name"] }],
  },
  {
    collection: "faqs",
    alreadyLocalized: ["question", "answer"],
  },
];

const LOCALE_CODES = new Set<string>(locales);

/**
 * A value is already migrated when it is a plain object keyed only by locale
 * codes. Lexical rich text (`{ root: … }`) and arrays fail this test, which is
 * exactly what we want.
 */
function isLocaleBucket(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;

  const keys = Object.keys(value as Record<string, unknown>);
  return keys.length > 0 && keys.every((key) => LOCALE_CODES.has(key));
}

function isEmpty(value: unknown): boolean {
  return value === undefined || value === null || value === "";
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  await mongoose.connect(url);
  const db = mongoose.connection.db;
  if (!db) throw new Error("No database handle after connecting");

  const existing = (await db.listCollections().toArray()).map((c) => c.name);
  const byLowerName = new Map(existing.map((name) => [name.toLowerCase(), name]));

  /**
   * Mongoose pluralises model names, so a Payload slug does not always match
   * the MongoDB collection ("experience" is stored as "experiences").
   */
  function resolveCollectionName(slug: string): string | undefined {
    for (const candidate of [slug, `${slug}s`, `${slug}es`]) {
      const match = byLowerName.get(candidate.toLowerCase());
      if (match) return match;
    }
    return undefined;
  }

  console.log(`\nmode: ${APPLY ? "APPLY (writing)" : "DRY RUN (no writes)"}`);
  console.log(`source locale for existing values: ${SOURCE_LOCALE}`);
  console.log(`backfilling ${defaultLocale} from: ${BACKFILL_FROM}\n`);

  let totalChanged = 0;

  for (const plan of PLAN) {
    const collectionName = resolveCollectionName(plan.collection);

    if (!collectionName) {
      console.log(`- ${plan.collection}: no matching MongoDB collection, skipping`);
      continue;
    }

    const collection = db.collection(collectionName);
    const docs = await collection.find({}).toArray();
    let changedDocs = 0;

    for (const doc of docs) {
      const update: Record<string, unknown> = {};

      for (const field of plan.newlyLocalized ?? []) {
        const value = doc[field];
        if (isEmpty(value) || isLocaleBucket(value)) continue;
        update[field] = { [SOURCE_LOCALE]: value };
      }

      for (const { array, fields } of plan.nestedInArray ?? []) {
        const rows = doc[array];
        if (!Array.isArray(rows)) continue;

        let rowChanged = false;
        const nextRows = rows.map((row) => {
          if (row === null || typeof row !== "object") return row;
          const next = { ...(row as Record<string, unknown>) };

          for (const field of fields) {
            const value = next[field];
            if (isEmpty(value) || isLocaleBucket(value)) continue;
            next[field] = { [SOURCE_LOCALE]: value };
            rowChanged = true;
          }

          return next;
        });

        if (rowChanged) update[array] = nextRows;
      }

      for (const field of plan.alreadyLocalized ?? []) {
        const value = doc[field];

        if (isLocaleBucket(value)) {
          // The default locale is now the fallback target; if it is empty the
          // content would vanish everywhere.
          if (isEmpty(value[defaultLocale]) && !isEmpty(value[BACKFILL_FROM])) {
            update[field] = { ...value, [defaultLocale]: value[BACKFILL_FROM] };
          }
        } else if (!isEmpty(value)) {
          // Was localized in the config but never written per-locale.
          update[field] = { [SOURCE_LOCALE]: value };
        }
      }

      if (Object.keys(update).length === 0) continue;

      changedDocs += 1;
      console.log(`  ${collectionName}/${String(doc._id)} → ${Object.keys(update).join(", ")}`);

      if (APPLY) {
        await collection.updateOne({ _id: doc._id }, { $set: update });
      }
    }

    console.log(`- ${collectionName}: ${changedDocs}/${docs.length} document(s) to change`);
    totalChanged += changedDocs;
  }

  console.log(
    `\n${APPLY ? "updated" : "would update"} ${totalChanged} document(s) in total.` +
      (APPLY ? "" : "\nRe-run with APPLY=1 to write the changes.\n")
  );

  await mongoose.disconnect();
}

// Top-level await, not `main().catch(...)`: `payload run` calls `process.exit`
// as soon as this module finishes importing, which would cut the migration off
// mid-flight if the promise were left dangling.
try {
  await main();
} catch (error) {
  console.error(error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
}
