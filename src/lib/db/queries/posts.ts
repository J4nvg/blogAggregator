import { RSSItem } from "src/rss";
import { db } from "..";
import { feedFollows, feeds, posts } from "../schema";
import { desc, eq, sql } from "drizzle-orm";

function toDateOrNull(s: string): Date | null {
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

export async function createPost(post: RSSItem, feedId: string) {
  const publishedAt = toDateOrNull(post.pubDate);

  const [result] = await db
    .insert(posts)
    .values({
      title: post.title,
      url: post.link,
      description: post.description,
      publishedAt,
      feedId,
    })
    .onConflictDoNothing({ target: posts.url }) // optional: avoid duplicate URL errors
    .returning();

  return result;
}

export async function getPostsForUser(userId:string,limit:number=2){
    return await db.select({
          id:posts.id,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          title: posts.title,
          url: posts.url,
          description: posts.description,
          publishedAt: posts.publishedAt,
        feedId: posts.feedId,
        feedTitle: feeds.name,
    })
    .from(posts)
    .innerJoin(feedFollows,eq(posts.feedId,feedFollows.feedId))
    .innerJoin(feeds,eq(posts.feedId,feeds.id))
    .where(eq(feedFollows.userId,userId))
    .orderBy(desc(sql`COALESCE(${posts.publishedAt},${posts.createdAt})`))
    .limit(limit);
}