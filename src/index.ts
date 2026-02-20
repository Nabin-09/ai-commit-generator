#!/usr/bin/env bun

import { stageAll, getDiff, commit, push } from "./git";
import { generateCommit } from "./ollama";

async function main() {
  const command = process.argv[2];

  if (!command) {
    console.log(`
Usage:
aic auto
aic push <branch>

Examples:
aic auto
aic push main
`);
    return;
  }


  console.log("📦 Staging changes...");
  await stageAll();

  const diff = await getDiff();


  console.log(" Generating commit...");
  const message = await generateCommit(diff);

  console.log("✅ Commit:", message);


  await commit(message);

  
  if (command === "push") {
    const branch = process.argv[3] || "main";
    console.log(` Pushing to ${branch}...`);
    await push(branch);
  }
}

main();