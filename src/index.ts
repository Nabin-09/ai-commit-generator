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

  // 🔥 Step 1: Auto stage
  console.log("📦 Staging changes...");
  await stageAll();

  // 🔥 Step 2: Get diff
  const diff = await getDiff();

  // 🔥 Step 3: Generate commit
  console.log("🤖 Generating commit...");
  const message = await generateCommit(diff);

  console.log("✅ Commit:", message);

  // 🔥 Step 4: Commit
  await commit(message);

  // 🔥 Step 5: Push (if needed)
  if (command === "push") {
    const branch = process.argv[3] || "main";
    console.log(`🚀 Pushing to ${branch}...`);
    await push(branch);
  }
}

main();