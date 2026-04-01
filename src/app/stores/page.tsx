import Link from "next/link";
import { getStores } from "@/lib/queries/stores";
import { SignInButton } from "@/components/auth/SignInButton";

export const dynamic = "force-dynamic";

export default async function StoresPage() {
  const stores = await getStores();

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

      <main className="mx-auto w-full max-w-3xl px-6 py-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Stores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stores.map((s) => (
            <Link
              key={s.store}
              href={`/store/${encodeURIComponent(s.store)}`}
              className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 hover:bg-zinc-900 transition-all"
            >
              <span className="text-sm font-semibold text-zinc-100">
                {s.store}
              </span>
              <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                {s.count} {s.count === 1 ? "deal" : "deals"}
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
