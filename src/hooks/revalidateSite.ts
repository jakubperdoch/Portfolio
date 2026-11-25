import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { revalidatePath } from "next/cache";

function revalidateEverything(reason: string, log: (message: string) => void) {
  log(`Revalidating site: ${reason}`);
  revalidatePath("/", "layout");
}

export const revalidateSiteAfterChange: CollectionAfterChangeHook = ({
  doc,
  collection,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidateEverything(`${collection.slug} changed`, (m) => payload.logger.info(m));
  }
  return doc;
};

export const revalidateSiteAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  collection,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    revalidateEverything(`${collection.slug} deleted`, (m) => payload.logger.info(m));
  }
  return doc;
};
