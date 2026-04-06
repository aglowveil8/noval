import { getDeals, getVoteScores, getUserVotes, getUserFavorites, getFeaturedDeal } from "@/lib/queries/deals";
import { auth } from "@/lib/auth";
import { DealGrid } from "@/components/deals/DealGrid";
import { DealSpotlight } from "@/components/deals/DealSpotlight";
import { SignInButton } from "@/components/auth/SignInButton";
import { NotificationManager } from "@/components/notifications/NotificationManager";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  const [deals, voteScores, userVotes, userFavorites, featuredDeal] = await Promise.all([
    getDeals({ sort: "newest" }),
    getVoteScores(),
    session?.user?.id ? getUserVotes(session.user.id) : Promise.resolve({} as Record<number, number>),
    session?.user?.id
      ? getUserFavorites(session.user.id)
      : Promise.resolve(new Set<number>()),
    getFeaturedDeal(),
  ]);

  const maxDiscount =
    deals.length > 0 ? Math.max(...deals.map((d) => d.discount)) : 0;

  return (
    <div className="flex flex-col flex-1">
      {/* Sale banner */}
      <div className="bg-emerald-500/10 border-b border-emerald-500/20 text-center py-2 px-4">
        <p className="text-sm text-emerald-400 font-medium">
          Dell Spring Sale + Best Buy Spring Sale live! MacBook Air M5 at lowest price ever — Up to{" "}
          {maxDiscount}% off
        </p>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/novallogo.png" alt="Noval" width={36} height={36} className="rounded" />
              <h1 className="text-lg font-bold tracking-tight">
                <span className="text-emerald-400">N</span>oval
              </h1>
            </Link>
            <span className="hidden sm:inline text-xs text-zinc-600 border-l border-zinc-800 pl-3">
              Tech Deals, Curated Daily
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/stores"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Stores
            </Link>
            {session?.user && (
              <>
                <Link
                  href="/favorites"
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Favorites
                </Link>
                <Link
                  href="/settings/alerts"
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Alerts
                </Link>
                <Link
                  href="/submit"
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  + Submit Deal
                </Link>
              </>
            )}
            <span className="text-xs text-zinc-500 font-mono">
              {deals.length} deals
            </span>
            <NotificationManager />
            <SignInButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-8 flex flex-col gap-6">
        {featuredDeal && <DealSpotlight deal={featuredDeal} />}
        <DealGrid
          deals={deals}
          voteScores={voteScores}
          userVotes={userVotes}
          userFavorites={Array.from(userFavorites)}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-800 py-6">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between text-xs text-zinc-600">
          <span>Noval — Tech deals, updated daily</span>
          <span>Prices may vary. Check retailer for latest.</span>
        </div>
      </footer>
    </div>
  );
}
