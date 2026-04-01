"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { favorites } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(dealId: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const existing = await db
    .select()
    .from(favorites)
    .where(and(eq(favorites.userId, session.user.id), eq(favorites.dealId, dealId)))
    .limit(1);

  if (existing.length > 0) {
    await db.delete(favorites).where(eq(favorites.id, existing[0].id));
  } else {
    await db.insert(favorites).values({
      userId: session.user.id,
      dealId,
    });
  }

  revalidatePath("/");
  revalidatePath("/favorites");
}
