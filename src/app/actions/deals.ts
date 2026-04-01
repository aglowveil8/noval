"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { deals } from "@/lib/schema";
import { redirect } from "next/navigation";

export async function submitDeal(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const originalPrice = formData.get("originalPrice") as string;
  const dealPrice = formData.get("dealPrice") as string;
  const store = formData.get("store") as string;
  const category = formData.get("category") as string;
  const url = formData.get("url") as string;

  if (!title || !originalPrice || !dealPrice || !store || !category || !url) {
    throw new Error("Missing required fields");
  }

  const origPrice = parseFloat(originalPrice);
  const dPrice = parseFloat(dealPrice);
  const discount = Math.round(((origPrice - dPrice) / origPrice) * 100);

  await db.insert(deals).values({
    title,
    description: description || title,
    originalPrice: origPrice.toFixed(2),
    dealPrice: dPrice.toFixed(2),
    discount,
    store,
    category,
    url,
  });

  redirect("/");
}
