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

You generate ONLY a Conventional Commit message.

Rules:
- Allowed types: feat, fix, refactor, docs, chore
- Present tense
- Max 50 characters
- No emojis
- No explanations
- One line only
- No trailing period
- Focus on intent and impact
- Never include extra text

Examples:
feat: add user authentication
fix: prevent payment crash
refactor: simplify service logic
docs: update setup guide
chore: update dependencies

Git diff:
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
        console.log(`❌Failed to connect to Ollama`);
        process.exit(1);
        
    }



}



