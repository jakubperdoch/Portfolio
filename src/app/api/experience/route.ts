import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";

export async function GET() {
  const payload = await getPayload({ config });

  const experiences = await payload.find({
    collection: "experience",
    limit: 10,
    sort: "-startDate",
  });

  if (!experiences) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }

  return NextResponse.json(experiences);
}
