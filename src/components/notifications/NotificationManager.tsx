"use client";

import { useState, useEffect } from "react";
import { subscribeToPush, unsubscribeFromPush } from "@/app/actions/notifications";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function NotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .then((reg) => reg.pushManager.getSubscription())
        .then((sub) => setSubscription(sub));
    }
  }, []);

  async function handleSubscribe() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    const serialized = JSON.parse(JSON.stringify(sub));
    await subscribeToPush(serialized);
  }

  async function handleUnsubscribe() {
    if (subscription) {
      const endpoint = subscription.endpoint;
      await subscription.unsubscribe();
      setSubscription(null);
      await unsubscribeFromPush(endpoint);
    }
  }

  if (!isSupported) return null;

  return (
    <div className="flex items-center gap-2">
      {subscription ? (
        <button
          onClick={handleUnsubscribe}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
          title="Notifications enabled"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleSubscribe}
          className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer"
          title="Enable notifications"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        </button>
      )}
    </div>
  );
}
