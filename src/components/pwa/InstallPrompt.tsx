"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as unknown as { MSStream?: unknown }).MSStream
    );
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    function handler(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isStandalone || dismissed) return null;
  if (!deferredPrompt && !isIOS) return null;

  async function handleInstall() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-200">Install Noval</p>
          {isIOS ? (
            <p className="text-xs text-zinc-500 mt-1">
              Tap the share button then &quot;Add to Home Screen&quot;
            </p>
          ) : (
            <p className="text-xs text-zinc-500 mt-1">
              Get deals on your home screen
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isIOS && (
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              Install
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
