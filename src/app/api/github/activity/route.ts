import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${process.env.GITHUB_USERNAME}/events?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
    }

    const data = await res.json();

    const pushEvents = data.filter((event: { type: string }) => event.type === "PushEvent");
    if (pushEvents.length === 0) {
      return NextResponse.json({ lastActive: null, commitsToday: 0 });
    }

    const lastEvent = pushEvents[0];
    const lastActiveDate = new Date(lastEvent.created_at);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const commitsToday = pushEvents
      .filter((e: { created_at: string }) => new Date(e.created_at) >= today)
      .reduce(
        (sum: number, e: { payload?: { commits?: { length: number }[] } }) =>
          sum + (e.payload?.commits?.length || 0),
        0
      );

    return NextResponse.json({
      lastActive: lastActiveDate.toISOString(),
      commitsToday,
    });
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
