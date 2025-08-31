import { getCurrentUserName } from "../config";
import { createFeedFollow, getFeedFollowsForUser, removeFeedFollowsForUser } from "../lib/db/queries/feedFollows";
import { createFeed, getAllFeeds, getFeedByUrl } from "../lib/db/queries/feeds";
import { getUser, getUserById } from "../lib/db/queries/users";
import { feeds, users } from "../lib/db/schema";
import { styleText } from "node:util";



export async function handlerAddFeed(cmdName: string,user: Users, ...args:string[]){
    if(!args.length){
        throw new Error("the add Feed handler expects a two argument, the feed name and the url \n .");
    }
        try{
            const feed = await createFeed(args[0],args[1],user.id);
            printFeed(feed,user);
            const res = await createFeedFollow(user.id,feed.id);
            console.log("Feed name: ",res.feedName," User name: ",res.userName);
        }
        catch{
            throw new Error("Something went wrong while creating new feed...");
        }
}

export type Feed = typeof feeds.$inferSelect;
export type Users = typeof users.$inferSelect;

export function printFeed(feed:Feed,user:Users){
    for (const [key, value] of Object.entries(feed)) {
    console.log(`${key} = ${value}`);
    }
}

export async function handlerListFeeds(cmdName: string, ...args:string[]){
    console.log("Collecting and printing all stored feeds...")
    const feeds = await getAllFeeds();
    for(const feed of feeds){
        const user = await getUserById(feed.userId)
        console.log(styleText(['bold', 'magenta'],"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"));
        console.log(styleText(['bold'],feed.name))
        console.log("\t> url: ",feed.url)
        console.log("\t> created by: ",user.name)
        console.log(styleText(['bold', 'magenta'],"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"));
    }
}

export async function handlerFeedFollow(cmdName: string,user: Users, ...args:string[]){
    if(!args.length){
        throw new Error("the Feed Follow handler expects one argument, the url \n .");
    }
        const feed = await getFeedByUrl(args[0]);
        const res = await createFeedFollow(user.id,feed.id);
        console.log("Feed name: ",res.feedName," User name: ",res.userName);
}

export async function handlerFollowing(cmdName: string, user: Users, ...args:string[]){
        const res = await getFeedFollowsForUser(user.id);
        console.log(styleText(["italic","bgBlack","greenBright"],`You (${user.name}) are currently following: `))
        for(const feed of res){
            console.log(styleText(["bold"],`> ${feed.feedName}`))
        }
}

export async function handlerRemoveFollowing(cmdName:string,user:Users,...args:string[]){
    if(!args.length){
        throw new Error("the remove follow handler expects one argument, the url \n .");
    }
    try{
        const feed = await getFeedByUrl(args[0]);
       await removeFeedFollowsForUser(user.id,feed.id);
       console.log(`You have sucessfully unfollowed: ${feed.name}`)
    }
    catch{
        throw new Error("Unfortunately something went wrong wen deleting the follow...");
    }
}