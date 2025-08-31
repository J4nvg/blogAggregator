import { setUser, readConfig } from "../config";
import { createUser, getAllUsers, getUser, resetUsers } from "../lib/db/queries/users";
import { fetchFeed } from "../rss";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;


export async function handlerLogin(cmdName: string, ...args:string[]){
    if(!args.length){
        throw new Error("the login handler expects a single argument, the username.");
    }
    if (!await getUser(args[0])){
        throw new Error("You can't login to an account that doesn't exist!");
    }
    else{
    setUser(args[0]);
    console.log("User has been set.");
    }
}
export async function handlerReset(cmdName: string, ...args:string[]){
    try{
        await resetUsers();
        process.exit(0);
    }
    catch{
        process.exit(1);
    }
}

export async function handlerRegister(cmdName: string, ...args:string[]){
    if(!args.length){
        throw new Error("the register handler expects a single argument, the username.");
    }
    const userInfo = await getUser(args[0])
    if(!userInfo){
        await createUser(args[0])
        setUser(args[0]);
        console.log("User was created and has been set. \n User info: \n",await getUser(args[0]));
    }
    else{
        throw new Error("This user already exists...")
    }
}
export async function handlerGetUsers(cmdName: string, ...args:string[]){
    const userInfo = await getAllUsers();
    const currentUser = readConfig().currentUserName;
    for(const user of userInfo){
         console.log(`* ${user.name}${user.name===currentUser?" (current)":""}`);;
    }
    
    // throw new Error("This user already exists...")

}


export type commandsRegistry = Record<string, CommandHandler>;

export async function registerCommand(registry: commandsRegistry, cmdName:string, handler: CommandHandler){
    registry[cmdName] = handler;
}


export async function runCommand(registry: commandsRegistry, cmdName:string, ...args: string[]){
        if(registry[cmdName]){
            await registry[cmdName](cmdName,...args);
        }
        else throw new Error("This command does not exist");
}
