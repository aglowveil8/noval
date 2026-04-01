"use server";

import webpush from "web-push";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pushSubscriptions, alertSubscriptions } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

webpush.setVapidDetails(
  "mailto:noval@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function subscribeToPush(subscription: {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}) {
  const session = await auth();

  await db
    .insert(pushSubscriptions)
    .values({
      userId: session?.user?.id ?? null,
      endpoint: subscription.endpoint,
      keysP256dh: subscription.keys.p256dh,
      keysAuth: subscription.keys.auth,
    })
    .onConflictDoUpdate({
      target: pushSubscriptions.endpoint,
      set: {
        keysP256dh: subscription.keys.p256dh,
        keysAuth: subscription.keys.auth,
        userId: session?.user?.id ?? null,
      },
    });

  return { success: true };
}

export async function unsubscribeFromPush(endpoint: string) {
  await db
    .delete(pushSubscriptions)
    .where(eq(pushSubscriptions.endpoint, endpoint));
  return { success: true };
}

export async function updateAlertPreferences(
  alerts: { type: string; value: string }[]
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  // Remove existing alerts
  await db
    .delete(alertSubscriptions)
    .where(eq(alertSubscriptions.userId, session.user.id));

  // Insert new alerts
  if (alerts.length > 0) {
    await db.insert(alertSubscriptions).values(
      alerts.map((a) => ({
        userId: session.user!.id!,
        type: a.type,
        value: a.value,
      }))
    );
  }

  revalidatePath("/settings/alerts");
  return { success: true };
}

export async function getUserAlerts() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db
    .select()
    .from(alertSubscriptions)
    .where(eq(alertSubscriptions.userId, session.user.id));
}
