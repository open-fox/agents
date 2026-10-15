# Codex 本地技能迁移

2026-10-15，将以下技能的实际文件统一到 `~/.agents/skills`，使用 `npx skills add` 安装并在 `.skill-lock.json` 注册上游来源。

| 技能 | 上游仓库 |
| --- | --- |
| design-artifact、html、html-wireframe、html-prototype、html-plan、html-diagram | https://github.com/plannotator/effective-html |
| ian-xiaohei-illustrations | https://github.com/helloianneo/ian-xiaohei-illustrations |
| playwright | https://github.com/openai/skills |

安装命令：

```sh
npx skills add plannotator/effective-html --skill design-artifact html html-wireframe html-prototype html-plan html-diagram --global --agent codex --yes
npx skills add helloianneo/ian-xiaohei-illustrations --skill ian-xiaohei-illustrations --global --agent codex --yes
npx skills add openai/skills --skill playwright --global --agent codex --yes
```

## 本地路径适配

- HTML 技能家族的六个技能全部位于全局目录。`html/SKILL.md` 使用上游原有的 `../<name>/SKILL.md` 相邻引用，无需本地路径适配。
- `playwright/SKILL.md` 和 `playwright/references/cli.md`：包装脚本路径改为 `$HOME/.agents/skills/playwright/scripts/playwright_cli.sh`。

`npx skills update` 或重新安装可能覆盖这些本地路径适配。更新 Playwright 后，复查包装脚本路径；锁文件中的哈希保留安装器记录的上游标识，不用本地修改冒充上游版本。

迁移验证包括 Markdown 文件引用、原有文件完整性、Codex 全局技能列表，以及 Playwright 包装脚本的 `--help`。八个原始目录已移出 Codex 扫描目录，不保留重复副本。
