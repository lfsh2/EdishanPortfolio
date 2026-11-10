// Tells Bing, Yandex and other IndexNow engines that every page in the sitemap changed.
// Run after a production deploy: `npm run indexnow`. ChatGPT search draws on Bing's index.
const site = (process.env.SITE_URL ?? "https://edishan-portfolio.vercel.app").replace(/\/$/, "");
const key = "74afac082c353fd348c1273b73c00d80"; // served from public/<key>.txt

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("No URLs found in the sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok && res.status !== 202) process.exit(1);
