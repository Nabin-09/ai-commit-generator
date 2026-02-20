type OllamaResponse = {
    response: string;
};

export async function generateCommit(
    diff: string,
    model: string = 'llama3.1:latest'
): Promise<string> {
    if (!diff) {
        console.log(`No changes done`)
        process.exit(0);
    }
    const prompt = `
You are a senior software engineer and open-source contributor.

Your task is to generate a high-quality, professional Conventional Commit message based on the provided Git diff.

Strict rules:
- Use the Conventional Commits standard.
- Allowed types only: feat, fix, refactor, docs, chore.
- Use present tense.
- Be concise, clear, and meaningful.
- Maximum 50 characters.
- No emojis.
- No trailing period.
- Focus on the **intent and impact**, not the code.
- Do not mention filenames, functions, or variables unless essential.
- Prefer user-facing or architectural meaning.
- If multiple changes exist, prioritize the most important one.
- If the diff is unclear, infer the most logical intent.
- Output ONLY the commit message. No explanation.

Guidelines:
- feat → new functionality or user-visible change
- fix → bug fixes
- refactor → code improvements without behavior change
- docs → documentation changes
- chore → tooling, config, dependency, or maintenance

Examples:
Diff: adds login API and validation
Output: feat: add user authentication

Diff: resolves crash in payment flow
Output: fix: prevent payment crash

Diff: cleans up duplicated service logic
Output: refactor: remove duplicate logic

Diff: updates README with setup guide
Output: docs: update setup instructions

Now generate the commit message.

Diff:
${diff}
`
    try {
        const res = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            body: JSON.stringify({
                model,
                prompt,
                stream: false,
            })
        })
    const data = (await res.json()) as OllamaResponse;
    return data.response.trim();
    }catch(err){
        console.log(`Failed to connect to Ollama`);
        process.exit(1);
        
    }



}



