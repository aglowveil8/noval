import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getFavoritedDeals, getVoteScores, getUserVotes } from "@/lib/queries/deals";
import { DealCard } from "@/components/deals/DealCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const [deals, voteScores, userVotes] = await Promise.all([
    getFavoritedDeals(session.user.id),
    getVoteScores(),
    getUserVotes(session.user.id),
  ]);

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-14">
          <h1 className="text-lg font-bold tracking-tight">
            <Link href="/">
              <span className="text-emerald-400">N</span>oval
            </Link>
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Your Favorites</h2>
        {deals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {deals.map((deal, i) => (
              <DealCard
                key={deal.id}
                deal={deal}
                index={i}
                score={voteScores[deal.id] ?? 0}
                userVote={userVotes[deal.id] ?? null}
                isFavorited={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-600">
            <p className="text-lg">No favorites yet</p>
            <p className="text-sm mt-1">
              Click the heart icon on any deal to save it here
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
