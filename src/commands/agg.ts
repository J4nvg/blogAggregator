import { getFeedByUrl, getNextFeedToFetch, markFeedFetched } from "src/lib/db/queries/feeds";
import { createPost } from "src/lib/db/queries/posts";
import { fetchFeed } from "src/rss";

function toDateOrNull(s: string): Date | null {
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

export async function scrapeFeeds(){
  const feed = await getNextFeedToFetch();
  if (!feed) {
    console.log("No feeds to scrape yet.");
    return;
  }
  await markFeedFetched(feed.id);
  const feedURL = feed.url;
  const feedData = await fetchFeed(feedURL);
  const feedId = (await getFeedByUrl(feedURL)).id
  for(const item of feedData.channel.item){
    console.log(item.title);
      const post = {
      title: item.title,
      link: item.link,
      description: item.description,
      pubDate: item.pubDate,
      }
      try{
      await createPost(post,feedId);
        console.log(`new Post created ${post}`);
    }
    catch{
      throw new Error("something went wrong while scraping and saving");
    }
  }
}

function parseDuration(durationStr: string){
  const regex = /(\d+)(ms|s|m|h)/g;
  let total = 0;
  let match;

  while ((match = regex.exec(durationStr)) !== null) {
    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case "ms": total += value; break;
      case "s": total += value * 1000; break;
      case "m": total += value * 60 * 1000; break;
      case "h": total += value * 60 * 60 * 1000; break;
    }
  }

  return total;
}


export async function handlerAgg(cmdName: string, ...args:string[]) {
    if(!args.length){
        throw new Error("the add Aggregation handler expects a one argument, the interval duration (e.g. 1m0s, 2h, 2s ) \n .");
    }
  const timeBetweenReqs = args[0]
  console.log(`Collecting feeds every ${timeBetweenReqs}`);
  const duration = parseDuration(timeBetweenReqs);
  if (duration <= 0) {
    console.error("Invalid duration. Use like: 1s, 5m, 2h");
    return;
  }

  scrapeFeeds().catch((err) => console.error("Scrape failed:", err));

  const interval = setInterval(() => {
    scrapeFeeds().catch((err) => console.error("Scrape failed:", err));
  }, duration);
  await new Promise<void>((resolve) => {
  process.on("SIGINT", () => {
    console.log("Shutting down feed aggregator...");
    clearInterval(interval);
    resolve();
  });
});
}