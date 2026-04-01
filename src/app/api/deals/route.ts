import { NextRequest, NextResponse } from "next/server";
import { getDeals, upsertDeal } from "@/lib/queries/deals";
import { db } from "@/lib/db";
import { priceHistory } from "@/lib/schema";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const deals = await getDeals({ category, sort, search });
  return NextResponse.json(deals);
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expected = `Bearer ${process.env.API_SECRET}`;

  if (!process.env.API_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (Array.isArray(body)) {
    const results = [];
    for (const deal of body) {
      const result = await upsertDeal(deal);
      if (result) {
        await db.insert(priceHistory).values({
          dealId: result.id,
          price: deal.dealPrice,
        });
        results.push(result);
      }
    }
    return NextResponse.json({ inserted: results.length, deals: results });
  }

  const result = await upsertDeal(body);
  if (result) {
    await db.insert(priceHistory).values({
      dealId: result.id,
      price: body.dealPrice,
    });
  }
  return NextResponse.json(result);
}
