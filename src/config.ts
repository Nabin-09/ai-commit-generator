import { existsSync, mkdirSync , readFileSync , writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";


const CONFIG_DIR = path.join(homedir() , '.commitmind')
const CONFIG_FILE = path.join(CONFIG_DIR , 'config.json')

type Config = {
    model : string;
};

export function getConfig() : Config | null{
    try{
        if(!existsSync(CONFIG_FILE)) return null;
        return JSON.parse(readFileSync(CONFIG_FILE , 'utf-8'));
    }catch(err){
        return null;
    }
}

export function saveConfig(config : Config){
    if(!existsSync(CONFIG_DIR)){
        mkdirSync(CONFIG_DIR);
    }
writeFileSync(CONFIG_FILE , JSON.stringify(config , null , 2));
}