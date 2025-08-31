import { getCurrentUserName } from "./config";
import { CommandHandler } from "./commands/handleCommands";
import { getUser } from "./lib/db/queries/users";
import { users } from "./lib/db/schema";

type User = typeof users.$inferSelect;

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void> | void;


export function middlewareLoggedIn(handler:UserCommandHandler): CommandHandler{
    return async (cmdName: string, ...args: string[]): Promise<void> => {
    const currentUserName = getCurrentUserName();
    if(!currentUserName){
            throw new Error("User not logged in");
          }
    const currentUser = await getUser(currentUserName);
        if(!currentUser){
            throw new Error(`User ${currentUserName} was not found`);
    }
    await handler(cmdName,currentUser,...args);
    };
}
