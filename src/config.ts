import fs from "fs";
import os from "os";
import path from "path";
const configFileName = ".gatorconfig.json"

export type Config = {
    dbUrl: string;
    currentUserName?: string;
}

function getConfigFilePath():string{
    return path.join(os.homedir(),configFileName);
}

function writeConfig(cfg: Config):void{
    const fixedNames = {
        db_url : cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    }
    const jsonString = JSON.stringify(fixedNames);
    fs.writeFileSync(getConfigFilePath(),jsonString)
}

function validateConfig(rawConfig: any): Config {
    const obj = JSON.parse(rawConfig);
    const validatedObj: Config = {
        dbUrl: obj.db_url,
    };
    if (obj.current_user_name !== undefined) {
        validatedObj.currentUserName = obj.current_user_name;
    }
    return validatedObj;
}


export function readConfig():Config{
    const rawConfig = fs.readFileSync(getConfigFilePath(), { encoding: 'utf8' });
    return validateConfig(rawConfig)
}

export function getCurrentUserName(){
    return readConfig().currentUserName || undefined;
}

export function setUser(userName:string){
    const currentConfig = readConfig();
    const newConfig = {
        dbUrl: currentConfig.dbUrl,
        currentUserName: userName,
    }
    writeConfig(newConfig);
}

