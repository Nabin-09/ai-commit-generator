#!/usr/bin/env node

import { stageAll, getDiff, commit, push } from "./git.js";
import { generateCommit } from "./ollama.js";
import { getConfig , saveConfig } from "./config.js";
import { selectModel } from "./selectModel.js";


async function resolveModel(cliModel?: string): Promise<string> {
  // 1. CLI flag wins (old users safe)
  if (cliModel) {
    saveConfig({ model: cliModel }); 
    return cliModel;
  }


  const config = getConfig();
  if (config?.model) return config.model;

  if (!process.stdout.isTTY) {
    return "llama3.1:latest";
  }

  console.log("No model configured.");
  return await selectModel();
}
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log(`
Usage:
aic auto
aic push <branch>

Model:
aic model set
aic model get

Examples:
aic auto
aic push main
`);
    return;
  }


  if (command === "model") {
    const sub = args[1];

    if (sub === "set") {
      await selectModel();
      return;
    }

    if (sub === "get") {
      const config = getConfig();
      console.log("Current model:", config?.model || "Not set");
      return;
    }
  }

  // -------- model flag --------
  let cliModel: string | undefined;
  const modelIndex = args.indexOf("--model");
  if (modelIndex !== -1 && args[modelIndex + 1]) {
    cliModel = args[modelIndex + 1];
  }

  const model = await resolveModel(cliModel);

  console.log("📦 Staging changes...");
  await stageAll();

  const diff = await getDiff();

  console.log(`Generating commit using ${model}...`);
  const message = await generateCommit(diff, model);

  console.log("Commit:", message);

  await commit(message);

  if (command === "push") {
    const branch = args[1] || "main";
    console.log(`Pushing to ${branch}...`);
    await push(branch);
  }
}

main();