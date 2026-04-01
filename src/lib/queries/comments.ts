import { db } from "@/lib/db";
import { comments, users } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

export async function getCommentsByDealId(dealId: number) {
  return db
    .select({
      id: comments.id,
      body: comments.body,
      createdAt: comments.createdAt,
      dealId: comments.dealId,
      userId: comments.userId,
      userName: users.name,
      userImage: users.image,
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.dealId, dealId))
    .orderBy(desc(comments.createdAt));
}

export type CommentWithUser = Awaited<ReturnType<typeof getCommentsByDealId>>[number];
