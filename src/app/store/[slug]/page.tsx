import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getDealsByStore } from "@/lib/queries/stores";
import { getVoteScores, getUserVotes, getUserFavorites } from "@/lib/queries/deals";
import { DealCard } from "@/components/deals/DealCard";
import { SignInButton } from "@/components/auth/SignInButton";

export const dynamic = "force-dynamic";

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = decodeURIComponent(slug);
  const session = await auth();

  const [deals, voteScores, userVotes, userFavorites] = await Promise.all([
    getDealsByStore(store),
    getVoteScores(),
    session?.user?.id ? getUserVotes(session.user.id) : Promise.resolve({} as Record<number, number>),
    session?.user?.id
      ? getUserFavorites(session.user.id)
      : Promise.resolve(new Set<number>()),
  ]);

  if (deals.length === 0) notFound();

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight">
              <Link href="/">
                <span className="text-emerald-400">N</span>oval
              </Link>
            </h1>
            <span className="text-xs text-zinc-600 border-l border-zinc-800 pl-3">
              <Link href="/stores" className="hover:text-zinc-400 transition-colors">
                Stores
              </Link>
              {" / "}
              {store}
            </span>
          </div>
          <SignInButton />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">{store} Deals</h2>
          <p className="text-sm text-zinc-500 mt-1">
            {deals.length} {deals.length === 1 ? "deal" : "deals"} available
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {deals.map((deal, i) => (
            <DealCard
              key={deal.id}
              deal={deal}
              index={i}
              score={voteScores[deal.id] ?? 0}
              userVote={userVotes[deal.id] ?? null}
              isFavorited={userFavorites.has(deal.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
