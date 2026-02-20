#  CommitMind

![npm](https://img.shields.io/npm/v/commitmind)
![downloads](https://img.shields.io/npm/dw/commitmind)
![license](https://img.shields.io/npm/l/commitmind)

**CommitMind** is an AI-powered Git CLI that automatically generates clean, meaningful commit messages using local LLMs via **Ollama**.

Stop wasting time writing commit messages. Let AI handle it — fast, private, and fully local.

---

##  Features

*  AI-generated semantic commit messages
*  Fast and local (no cloud, no API keys)
*  Privacy-first — your code never leaves your machine
*  Auto stage, commit, and push
*  Conventional commit format
*  Works in any Git project
*  Cross-platform (Windows, Mac, Linux)

---

##  Installation

Install globally:

```bash
npm install -g commitmind
```

Or with Bun:

```bash
bun add -g commitmind
```

---

##  Requirements

CommitMind uses **Ollama** to run AI locally.

###  Install Ollama

Download from:
👉 https://ollama.com

###  Start Ollama

```bash
ollama serve
```

###  Pull the model

```bash
ollama pull llama3
```

---

##  Usage

###  Auto generate commit message

```bash
aic auto
```

This will:

1. Stage all changes
2. Generate an AI commit message
3. Commit automatically

---

###  Commit and push

```bash
aic push main
```

This will:

1. Stage changes
2. Generate commit
3. Commit
4. Push to branch

---

##  Example Workflow

```bash
git checkout -b feature-auth
# make changes
aic auto
aic push main
```

---

##  Why CommitMind?

Writing commit messages is repetitive and often ignored.
CommitMind helps maintain:

* Clean project history
* Semantic commits
* Faster workflow
* Better collaboration

All while keeping your data private.

---

##  Privacy First

CommitMind runs entirely on your machine using local models.
Your source code is never sent to external servers.

---

##  Tech Stack

* Node.js CLI
* TypeScript
* Ollama (Local LLM)
* Conventional commits

---

##  Roadmap

* Interactive commit preview
* Smart commit type detection
* Git hooks integration
* VS Code extension
* Multi-model support
* Config file
* Streaming AI output

---

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Submit a pull request

---

##  Support

If you like this project:

*  Star it on GitHub
* Share with your friends
* Give feedback

---

##  License

MIT © Nabin Sharma

---

##  Links

* GitHub: https://github.com/Nabin-09/ai-commit-generator
* Issues: https://github.com/Nabin-09/ai-commit-generator/issues

---

Made with ❤️ for developers.
