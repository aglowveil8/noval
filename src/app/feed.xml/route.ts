import { getDeals } from "@/lib/queries/deals";

export async function GET() {
  const deals = await getDeals({ sort: "newest" });
  const latest50 = deals.slice(0, 50);

  const items = latest50
    .map(
      (deal) => `    <item>
      <title><![CDATA[${deal.title} - ${deal.discount}% off at ${deal.store}]]></title>
      <link>${deal.url}</link>
      <description><![CDATA[${deal.description}. Was $${Number(deal.originalPrice).toFixed(2)}, now $${Number(deal.dealPrice).toFixed(2)} (${deal.discount}% off) at ${deal.store}.]]></description>
      <category>${deal.category}</category>
      <pubDate>${new Date(deal.postedAt).toUTCString()}</pubDate>
      <guid>https://noval-weld.vercel.app/deals/${deal.id}</guid>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Noval — Tech Deals</title>
    <link>https://noval-weld.vercel.app</link>
    <description>The best tech deals on the internet, curated daily.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://noval-weld.vercel.app/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
