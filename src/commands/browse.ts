import { getPostsForUser } from "src/lib/db/queries/posts";
import { Users } from "./feeds";
import { styleText } from "node:util";

export async function handlerBrowse(cmdName: string, user: Users,...args:string[]) {
    if(!args.length){
        const posts = await getPostsForUser(user.id);
        console.log(styleText(["italic","bgBlack","greenBright"],`Showing your (${user.name}) posts: `))
        prettyPrinter(posts);
    }
    else{
        const posts = await getPostsForUser(user.id,parseInt(args[0]));
        console.log(styleText(["italic","bgBlack","greenBright"],`Showing your (${user.name}) ${args[0]} posts: `))
        prettyPrinter(posts);
    }
}

type Post = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    url: string;
    description: string | null;
    publishedAt: Date | null;
    feedId: string;
    feedTitle: string;
}

function prettyPrinter(posts:Post[]){
    const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            };
    for(const post of posts ){
        console.log(styleText(['bold',"bgBlack", 'blueBright'],"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"));
        console.log(styleText(["bold","italic","blueBright","bgBlack"],`\t [Feed] ${post.feedTitle}`), styleText(["bgBlack","italic","framed"],`\t${post.publishedAt?.toLocaleDateString("en-NL")}\n`))
        console.log(styleText(["bgBlack","whiteBright"],`[Title] ${post.title} `))
        console.log(styleText(["bgBlack","whiteBright"],`[Desc] ${post.description}\n`))
        console.log(styleText(["bgBlack","underline","italic","framed","dim"],`[Link] ${post.url}`))
        console.log(styleText(["bgBlack",'bold', 'blueBright'],"▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n"));
    }
}