---
name: tanstarter-create
description: Create and initialize a new TanStarter SaaS project from the official template. Use when a user asks to create, scaffold, initialize, or deploy a TanStarter project, including provisioning Cloudflare D1, R2, and KV resources, configuring an optional custom domain, creating a GitHub repository, or enabling Waffo test payments.
---

# TanStarter Create

## Overview

Use the TanStarter CLI to create a project and complete its initialization. It clones the official template, provisions the selected Cloudflare resources, configures the project, deploys it, creates/connects a GitHub repository, and pushes the initial commit.

## Gather the required choices

Before running the CLI, obtain:

- A project name, which becomes the new directory name and Cloudflare resource prefix.
- Whether to use the default `none` payment option or `waffo` test payments. Ask this only when the user has not stated it.

The CLI defaults D1, R2, KV, and Worker names to the project name; derives the GitHub repository from the authenticated `gh` login (`<owner>/<project>`); and uses the Workers URL with no custom domain. Explain that this workflow creates billable/external Cloudflare and GitHub resources, deploys publicly, and pushes an initial commit; proceed only when the user has requested that outcome.

## Check prerequisites

Verify these without printing secret values:

- Node.js 20+, `pnpm`, `git`, and authenticated GitHub CLI (`gh`). The CLI can install missing `pnpm`, `git`, or `gh` when a supported package manager is available.
- `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` are set in the invoking shell.
- For Waffo, `WAFFO_MERCHANT_ID` and `WAFFO_PRIVATE_KEY` are also set. The CLI provisions Waffo in test mode only.

Never read, print, copy, or persist credential values. The CLI stores resumable state at `<project>/.tanstarter/state.json` and excludes sensitive Cloudflare/Waffo credential values from that state.

## Select the CLI version

Use the published CLI for capabilities shown by its help output. Before relying on an option such as `--payment`, run:

```bash
npx --yes tanstarter-cli@latest --help
```

When the requested option is not yet published, use a local checkout that contains the capability. From that checkout, build and run the compiled entry point:

```bash
pnpm build
node dist/index.js create
```

Do not claim that npm `latest` supports unlisted options. Do not publish a new CLI version as part of project creation unless the user has explicitly requested publication.

## Create the project

Run from the parent directory that should contain the new project. To preserve the payment question while automatically accepting the default domain, resource names, GitHub repository, and final confirmation, run:

```bash
npx --yes tanstarter-cli@latest create my-app --yes
```

With a supplied project name and payment choice, use `--yes --payment` for a fully non-interactive flow:

```bash
npx --yes tanstarter-cli@latest create my-app --yes --payment none
```

Without `--yes`, keep the CLI's normal interactive review: it asks for the defaultable fields and final confirmation. Use `--repo` or `--domain` only when the user explicitly supplied an override:

```bash
tanstarter create my-app \
  --repo owner/my-app \
  --domain app.example.com
```

For a checkout that supports Waffo, add `--payment waffo`. That flow creates the template's Waffo store, products, and webhook after public deployment is reachable.

Report the actual created directory, deployment URL, repository URL, and which verification steps completed. Distinguish local CLI completion from testing real payment checkout flows.

## Recover or remove a generated project

If initialization fails after the project directory exists, fix the reported prerequisite or provider issue and resume from the parent directory:

```bash
tanstarter create my-app --resume
```

Use deletion only when the user explicitly asks to remove the generated Cloudflare and GitHub resources:

```bash
tanstarter delete my-app
```

Do not delete a project merely because a setup step failed; use `--resume` first.
