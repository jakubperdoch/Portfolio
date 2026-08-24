import { getPayload } from "payload";
import { NextResponse } from "next/server";
import config from "@payload-config";

export async function GET() {
  const payload = await getPayload({ config });

  const projects = await payload.find({
    collection: "projects",
    limit: 10,
    sort: "-publishedAt",
  });

  if (!projects) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }

  return NextResponse.json(projects);
}
