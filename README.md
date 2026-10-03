# Auto-Suggest MCP Prototype

A proof of concept that uses [Claude Code hooks](https://code.claude.com/docs/en/hooks) to suggest relevant context before Claude processes a prompt. The current demo uses TypeSafe to recommend sample law-firm agent skills.

## Getting Started

You need [Bun](https://bun.sh), [Claude Code](https://code.claude.com/docs/en/overview), and a TypeSafe API key.

1. Open a terminal in this project directory and install the dependencies:
   ```sh
   bun install
   ```
2. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```
   In PowerShell, use `Copy-Item .env.example .env`.
3. Set your API key in `.env`:
   ```dotenv
   TYPESAFE_API_KEY=apikey_
   ```
   Bun loads `.env` when it starts the MCP server. The `.env` file is ignored by Git.
4. Start Claude Code from this project directory:
   ```sh
   claude
   ```
   Accept the workspace trust prompt if shown. Claude Code loads the project configuration automatically: `.mcp.json` starts the `auto-suggest` server with `bun run mcp`, and `.claude/settings.json` enables it and registers the `UserPromptSubmit` hook. No manual server registration is needed.
5. Use `/mcp` to check that `auto-suggest` is connected, then try a prompt such as:
   ```text
   What clauses should I review before signing an employment agreement?
   ```
   The hook calls `recommend_skills` and adds a suggestion to Claude's context when a relevant skill meets the confidence threshold. Unrelated prompts may produce no suggestion. Suggested skills are external marketplace listings and require download and installation before use.

## Development

Run the project checks:

```sh
bun run check
bun run lint
bun run fmt
```

After making changes, run the automatic fixes:

```sh
bun run lint:fix
bun run fmt:fix
```
