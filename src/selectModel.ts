
import { saveConfig } from "./config.js";
import readline from "readline";

async function getOllamaModels():Promise<string[]> {
    try {
        const res = await fetch('http://localhost:11434/api/tags');
        const data = await res.json();
        return data.models.map((m : any)=> m.name)
    }catch(err){
        console.log(`Ollama is not running ${err}`)
        process.exit(1);
    }
}

export async function selectModel() : Promise<string>{
    const models = await getOllamaModels();
    if(!models.length){
        console.log(`No Ollama models found ! `);
        process.exit(1);
    }
    console.log('Choose an Ollama model : ');
    models.forEach((m , i)=> console.log(`${i + 1}.${m}`));

    const rl = readline.createInterface({
        input: process.stdin,
        output : process.stdout,
    })

    const choice = await new Promise<number>((res)=>{
        rl.question('Enter number : ' , (ans)=>{
            rl.close();
            res(Number(ans))
        })
    })

    const selected = models[choice - 1];
    if(!selected){
        console.log(`Invalid Choice`);
        process.exit(1);
    }

    saveConfig({model : selected});
    console.log(`Model saved : ${selected}`);
    return selected;
}