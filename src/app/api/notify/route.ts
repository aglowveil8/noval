import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { db } from "@/lib/db";
import { pushSubscriptions, alertSubscriptions } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";

webpush.setVapidDetails(
  "mailto:noval@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { deal } = await request.json();
  if (!deal) {
    return NextResponse.json({ error: "Deal required" }, { status: 400 });
  }

  // Find alert subscriptions matching this deal
  const matchingAlerts = await db
    .select({ userId: alertSubscriptions.userId })
    .from(alertSubscriptions)
    .where(
      sql`(${alertSubscriptions.type} = 'category' AND ${alertSubscriptions.value} = ${deal.category})
        OR (${alertSubscriptions.type} = 'store' AND ${alertSubscriptions.value} = ${deal.store})
        OR (${alertSubscriptions.type} = 'keyword' AND ${deal.title} ILIKE '%' || ${alertSubscriptions.value} || '%')`
    );

  const userIds = [...new Set(matchingAlerts.map((a) => a.userId))];

  if (userIds.length === 0) {
    return NextResponse.json({ notified: 0 });
  }

  // Get push subscriptions for matching users
  const subs = await db
    .select()
    .from(pushSubscriptions)
    .where(sql`${pushSubscriptions.userId} = ANY(${userIds})`);

  const payload = JSON.stringify({
    title: `${deal.title} - ${deal.discount}% off`,
    body: `${deal.store}: $${deal.dealPrice} (was $${deal.originalPrice})`,
    url: `/deals/${deal.id}`,
  });

  let sent = 0;
  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.keysP256dh, auth: sub.keysAuth },
        },
        payload
      );
      sent++;
    } catch {
      // Remove invalid subscriptions
      await db
        .delete(pushSubscriptions)
        .where(eq(pushSubscriptions.id, sub.id));
    }
  }

  return NextResponse.json({ notified: sent });
}
