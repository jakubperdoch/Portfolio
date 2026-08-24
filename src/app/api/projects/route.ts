import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  const payload = await getPayload({ config });

  const projects = await payload.find({
    collection: "media",
  });
}
