import { setUser, readConfig } from "./config";
import { handlerAddFeed, handlerFeedFollow, handlerFollowing, handlerListFeeds, handlerRemoveFollowing } from "./commands/feeds";
import { commandsRegistry,handlerGetUsers,handlerLogin, handlerRegister, handlerReset, registerCommand, runCommand } from "./commands/handleCommands";
import { middlewareLoggedIn } from "./middleware";
import { fetchFeed } from "./rss";
import { handlerAgg } from "./commands/agg";
import { handlerBrowse } from "./commands/browse";

function listCommands(reg:commandsRegistry){
	console.log("The following commands can be used:")
	for(const cmd in reg){
		console.log(`• ${cmd}`);
	}
}


async function main(){
	let cmdRegistry:commandsRegistry = {};
	// console.log(readConfig());
	registerCommand(cmdRegistry,"login",handlerLogin);
	registerCommand(cmdRegistry,"register",handlerRegister);
	registerCommand(cmdRegistry,"reset",handlerReset);
	registerCommand(cmdRegistry,"users",handlerGetUsers);
	registerCommand(cmdRegistry,"agg",handlerAgg);

	registerCommand(cmdRegistry,"addfeed",middlewareLoggedIn(handlerAddFeed));

	registerCommand(cmdRegistry,"feeds",handlerListFeeds);

	registerCommand(cmdRegistry,"follow",middlewareLoggedIn(handlerFeedFollow));

	registerCommand(cmdRegistry,"following",middlewareLoggedIn(handlerFollowing));
	registerCommand(cmdRegistry,"unfollow",middlewareLoggedIn(handlerRemoveFollowing));
	registerCommand(cmdRegistry,"browse",middlewareLoggedIn(handlerBrowse));

	const input = process.argv.slice(2);
	if(input.length < 1){
		console.log("No arguments were supplied.")
		process.exit(1);
	}
	const args = input.slice(1);
	const cmd = input[0].toLowerCase();
	try {
		if(cmd === "help"){
			listCommands(cmdRegistry);
		}else{
		await runCommand(cmdRegistry,cmd,...args);
		}
		process.exit(0);
	}
	catch (error) {
		if (error instanceof Error) {
			console.log(`Caught an error: ${error.message}`);
			process.exit(1);
		} else {
			console.log("Caught an error, but it does not have a message.");
			process.exit(1);
		}
		}
}

main();

