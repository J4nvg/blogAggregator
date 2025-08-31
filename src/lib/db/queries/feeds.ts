import { Feed } from "src/commands/feeds";
import { db } from "..";
import { feeds } from "../schema";
import { eq, sql } from 'drizzle-orm';

export async function createFeed(name: string, url:string,userId:string) {
  const [result] = await db.insert(feeds).values({ name: name, url:url,userId:userId}).returning();
  return result;
}


export async function getFeedByUrl(url:string) {
    const [result] = await db
    .select()
    .from(feeds)
    .where(eq(feeds.url,url));
    return result;
}

export async function getAllFeeds() {
    return await db
    .select()
    .from(feeds);
}

export async function markFeedFetched(feedId:string){
  try{
  await db.update(feeds)
  .set({
    updatedAt:sql`NOW()`,
    lastFetchedAt:sql`NOW()`
  })
  .where(eq(feeds.id,feedId));
  }
  catch{
    throw new Error("Something went wrong when marking the feed as fetched");
  }
}

export async function getNextFeedToFetch(){
  try{
  const [res] = await db.execute(sql`SELECT * FROM feeds ORDER BY last_fetched_at ASC NULLS FIRST LIMIT 1 `)
  return res as Feed
  }
  catch{
    throw new Error("Something went wrong when trying to fetch the next feed...")
  }
}