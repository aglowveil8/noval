import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserAlerts } from "@/app/actions/notifications";
import { AlertPreferences } from "@/components/notifications/AlertPreferences";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AlertsPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  const currentAlerts = await getUserAlerts();

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

      <main className="mx-auto w-full max-w-xl px-6 py-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Deal Alerts</h2>
          <p className="text-sm text-zinc-500 mt-1">
            Get notified when deals match your preferences
          </p>
        </div>
        <AlertPreferences currentAlerts={currentAlerts} />
      </main>
    </div>
  );
}
