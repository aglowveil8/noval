"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { votes } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function voteDeal(dealId: number, value: 1 | -1) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const existing = await db
    .select()
    .from(votes)
    .where(and(eq(votes.userId, session.user.id), eq(votes.dealId, dealId)))
    .limit(1);

  if (existing.length > 0) {
    if (existing[0].value === value) {
      // Remove vote (toggle off)
      await db.delete(votes).where(eq(votes.id, existing[0].id));
    } else {
      // Change vote
      await db
        .update(votes)
        .set({ value })
        .where(eq(votes.id, existing[0].id));
    }
  } else {
    await db.insert(votes).values({
      userId: session.user.id,
      dealId,
      value,
    });
  }

  revalidatePath("/");
}
