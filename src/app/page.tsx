import { getDeals } from "@/lib/queries/deals";
import { DealGrid } from "@/components/deals/DealGrid";
import { SignInButton } from "@/components/auth/SignInButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  const deals = await getDeals({ sort: "newest" });

  const maxDiscount =
    deals.length > 0 ? Math.max(...deals.map((d) => d.discount)) : 0;

  return (
    <div className="flex flex-col flex-1">
      {/* Sale banner */}
      <div className="bg-emerald-500/10 border-b border-emerald-500/20 text-center py-2 px-4">
        <p className="text-sm text-emerald-400 font-medium">
          Dell Spring Sale + Best Deals from Amazon & Best Buy — Up to{" "}
          {maxDiscount}% off
        </p>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-emerald-400">N</span>oval
            </h1>
            <span className="hidden sm:inline text-xs text-zinc-600 border-l border-zinc-800 pl-3">
              Tech Deals, Curated Daily
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-mono">
              {deals.length} deals
            </span>
            <SignInButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-8 flex flex-col gap-6">
        <DealGrid deals={deals} />
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
