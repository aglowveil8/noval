import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { submitDeal } from "@/app/actions/deals";
import Link from "next/link";

const categories = [
  "Laptops",
  "Headphones",
  "Tablets",
  "Monitors",
  "Phones",
  "Storage",
  "Smart Home",
  "Gaming",
  "Audio",
  "Wearables",
  "Networking",
];

export default async function SubmitDealPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");

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

      <main className="mx-auto w-full max-w-xl px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Submit a Deal</h2>
        <form action={submitDeal} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Title</label>
            <input
              name="title"
              required
              placeholder="e.g. Sony WH-1000XM5 Headphones"
              className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={2}
              placeholder="Brief description of the deal"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                Original Price ($)
              </label>
              <input
                name="originalPrice"
                type="number"
                step="0.01"
                required
                placeholder="299.99"
                className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                Deal Price ($)
              </label>
              <input
                name="dealPrice"
                type="number"
                step="0.01"
                required
                placeholder="199.99"
                className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Store</label>
              <input
                name="store"
                required
                placeholder="e.g. Amazon"
                className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Deal URL
            </label>
            <input
              name="url"
              type="url"
              required
              placeholder="https://www.amazon.com/dp/..."
              className="w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>
          <button
            type="submit"
            className="h-11 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-colors cursor-pointer"
          >
            Submit Deal
          </button>
        </form>
      </main>
    </div>
  );
}
