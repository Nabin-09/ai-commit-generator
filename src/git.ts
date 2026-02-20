import { execSync } from "child_process";

export function stageAll() {
  execSync("git add .", { stdio: "inherit" });
}

export function getDiff(): string {
  return execSync("git diff --staged --no-color").toString();
}

export function commit(msg: string) {
  execSync(`git commit -m "${msg}"`, { stdio: "inherit" });
}

export function push(branch: string) {
  execSync(`git push origin ${branch}`, { stdio: "inherit" });
}