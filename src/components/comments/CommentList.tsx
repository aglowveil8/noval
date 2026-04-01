"use client";

import { deleteComment } from "@/app/actions/comments";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { timeAgo } from "@/lib/utils";
import type { CommentWithUser } from "@/lib/queries/comments";

export function CommentList({
  comments,
  dealId,
}: {
  comments: CommentWithUser[];
  dealId: number;
}) {
  if (comments.length === 0) {
    return (
      <p className="text-sm text-zinc-600 text-center py-4">
        No comments yet. Be the first!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} dealId={dealId} />
      ))}
    </div>
  );
}

function CommentItem({
  comment,
  dealId,
}: {
  comment: CommentWithUser;
  dealId: number;
}) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const isOwner = session?.user?.id === comment.userId;

  return (
    <div className="flex gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-900/40">
      {comment.userImage ? (
        <img
          src={comment.userImage}
          alt=""
          className="h-8 w-8 rounded-full border border-zinc-700 shrink-0"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-400 shrink-0">
          {comment.userName?.[0]?.toUpperCase() ?? "?"}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-200">
            {comment.userName ?? "Anonymous"}
          </span>
          <span className="text-xs text-zinc-600">
            {timeAgo(comment.createdAt.toISOString())}
          </span>
          {isOwner && (
            <button
              onClick={() =>
                startTransition(() => deleteComment(comment.id, dealId))
              }
              disabled={isPending}
              className="text-xs text-zinc-600 hover:text-red-400 transition-colors cursor-pointer ml-auto"
            >
              Delete
            </button>
          )}
        </div>
        <p className="text-sm text-zinc-300 mt-1">{comment.body}</p>
      </div>
    </div>
  );
}
