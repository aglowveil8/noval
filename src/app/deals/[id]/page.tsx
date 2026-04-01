import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getDealById, getVoteScores, getUserVotes, getUserFavorites, getComparableDeals } from "@/lib/queries/deals";
import { getCommentsByDealId } from "@/lib/queries/comments";
import { getPriceHistory } from "@/lib/queries/price-history";
import { formatPrice, timeAgo } from "@/lib/utils";
import { VoteButtons } from "@/components/deals/VoteButtons";
import { FavoriteButton } from "@/components/deals/FavoriteButton";
import { PriceChart } from "@/components/deals/PriceChart";
import { CommentList } from "@/components/comments/CommentList";
import { CommentForm } from "@/components/comments/CommentForm";
import { SignInButton } from "@/components/auth/SignInButton";

export const dynamic = "force-dynamic";

export default async function DealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dealId = parseInt(id, 10);
  if (isNaN(dealId)) notFound();

  const session = await auth();
  const [deal, priceHistoryData, commentsData, voteScores, userVotes, userFavorites] =
    await Promise.all([
      getDealById(dealId),
      getPriceHistory(dealId),
      getCommentsByDealId(dealId),
      getVoteScores(),
      session?.user?.id ? getUserVotes(session.user.id) : Promise.resolve({} as Record<number, number>),
      session?.user?.id
        ? getUserFavorites(session.user.id)
        : Promise.resolve(new Set<number>()),
    ]);

  if (!deal) notFound();

  const comparableDeals = deal.productSlug
    ? await getComparableDeals(deal.productSlug, deal.id)
    : [];

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-14">
          <h1 className="text-lg font-bold tracking-tight">
            <Link href="/">
              <span className="text-emerald-400">N</span>oval
            </Link>
          </h1>
          <SignInButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-8 flex flex-col gap-8">
        {/* Deal header */}
        <div className="flex gap-4">
          <VoteButtons
            dealId={deal.id}
            score={voteScores[deal.id] ?? 0}
            userVote={userVotes[deal.id] ?? null}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {deal.expired && (
                <span className="text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full">
                  EXPIRED
                </span>
              )}
              {deal.hot && !deal.expired && (
                <span className="text-xs font-semibold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-0.5 rounded-full">
                  HOT
                </span>
              )}
              <span className="text-xs text-zinc-500 font-mono">
                {timeAgo(deal.postedAt.toISOString())}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">{deal.title}</h2>
            <p className="text-sm text-zinc-400 mt-2">{deal.description}</p>
          </div>
        </div>

        {/* Price + action */}
        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white font-mono">
                {formatPrice(Number(deal.dealPrice))}
              </span>
              <span className="text-lg text-zinc-600 line-through font-mono">
                {formatPrice(Number(deal.originalPrice))}
              </span>
              <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg">
                -{deal.discount}%
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-zinc-500">
              <span>{deal.store}</span>
              <span>&middot;</span>
              <span>{deal.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FavoriteButton
              dealId={deal.id}
              isFavorited={userFavorites.has(deal.id)}
            />
            <a
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 h-11 flex items-center rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-colors"
            >
              Go to Store
            </a>
          </div>
        </div>

        {/* Price history */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h3 className="text-lg font-semibold mb-4">Price History</h3>
          <PriceChart history={priceHistoryData} />
        </div>

        {/* Price comparison */}
        {comparableDeals.length > 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h3 className="text-lg font-semibold mb-4">Compare Prices</h3>
            <div className="flex flex-col gap-2">
              {comparableDeals.map((d) => (
                <Link
                  key={d.id}
                  href={`/deals/${d.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors"
                >
                  <div>
                    <span className="text-sm font-medium text-zinc-200">
                      {d.store}
                    </span>
                    <span className="text-xs text-zinc-500 ml-2">
                      {d.title}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-white font-mono">
                      {formatPrice(Number(d.dealPrice))}
                    </span>
                    <span className="text-xs text-emerald-400">
                      -{d.discount}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h3 className="text-lg font-semibold mb-4">
            Comments ({commentsData.length})
          </h3>
          <div className="flex flex-col gap-4">
            <CommentForm dealId={deal.id} />
            <CommentList comments={commentsData} dealId={deal.id} />
          </div>
        </div>
      </main>
    </div>
  );
}
