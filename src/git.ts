export async function stageAll(){
    await $`git add .`;
}

export async function getDiff() : Promise<string>{
    const diff = await $`git diff --staged --no-color`.text();
    return diff;
}

export async function commit(msg : string){
    await $`git commit -m ${msg}`
}

export async function push(branch : string){
    await $`git push origin ${branch}`
}