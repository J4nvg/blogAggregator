import { db } from "..";
import { feedFollows, feeds, users} from "../schema";
import { and, eq, sql } from "drizzle-orm";

export async function createFeedFollow(userId:string,feedId:string) {
    try{
    const [newFeedFollow] = await db.insert(feedFollows).values({ userId:userId,feedId:feedId}).returning();
  const result = await db.select({
    id:feedFollows.id,
    createdAt:feedFollows.createdAt,
    updatedAt:feedFollows.updatedAt,
    feedName:feeds.name,
    user_id:feedFollows.userId,
    feed_id:feedFollows.feedId,
    feedUrl:feeds.url,
    userName:users.name
  })
  .from(feedFollows)
  .innerJoin(feeds,eq(feedFollows.feedId,feeds.id))
  .innerJoin(users,eq(feedFollows.userId,users.id))
  .where(eq(feedFollows.id,newFeedFollow.id))
  return result[0] || null;
  }catch(error){
    console.log(error);
    throw new Error("Something went wrong while creating new feed to follow...")
  }
}


export async function getFeedFollowsForUser(userId:string){
      try{
 return await db.select({
    feedName:feeds.name,
    userName:users.name
  })
  .from(feedFollows)
  .innerJoin(feeds,eq(feedFollows.feedId,feeds.id))
  .innerJoin(users,eq(feedFollows.userId,users.id))
  .where(eq(feedFollows.userId,userId))
  }catch{
    throw new Error("Something went wrong while returning feed to follow...")
  }
}

export async function removeFeedFollowsForUser(userId:string,feedId:string){
  try{
    await db
    .delete(feedFollows)
    .where(and(eq(feedFollows.userId,userId),
    eq(feedFollows.feedId,feedId))
    )
  }
  catch{
    throw new Error("Something went wrong while deleting feed for user...")
  }
}

