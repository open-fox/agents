#!/usr/bin/env bash
set -euo pipefail

# Expose only scripts at the path used by upstream Playwright instructions.
task_repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
task_codex_root="${1:-${CODEX_HOME:-$HOME/.codex}}"
task_source="$task_repo_root/skills/playwright/scripts"
task_destination="$task_codex_root/skills/playwright/scripts"

if [[ $# -gt 1 ]]; then
  echo "Usage: $0 [codex-home]" >&2
  exit 1
fi
if [[ ! -f "$task_source/playwright_cli.sh" ]]; then
  echo "Install the global Playwright skill before creating its compatibility link." >&2
  exit 1
fi
if [[ -e "$task_destination" || -L "$task_destination" ]]; then
  if [[ -L "$task_destination" && "$(readlink "$task_destination")" == "$task_source" ]]; then
    echo "Playwright compatibility link is already configured."
    exit 0
  fi
  echo "Refusing to replace existing path: $task_destination" >&2
  exit 1
fi
mkdir -p "$(dirname "$task_destination")"
ln -s "$task_source" "$task_destination"
echo "Created $task_destination -> $task_source"
