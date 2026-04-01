"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { comments } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addComment(dealId: number, body: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");
  if (!body.trim()) throw new Error("Comment cannot be empty");

  await db.insert(comments).values({
    dealId,
    userId: session.user.id,
    body: body.trim(),
  });

  revalidatePath(`/deals/${dealId}`);
}

export async function deleteComment(commentId: number, dealId: number) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await db
    .delete(comments)
    .where(
      and(eq(comments.id, commentId), eq(comments.userId, session.user.id))
    );

  revalidatePath(`/deals/${dealId}`);
}
