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
- Playwright 保持上游文件原样。运行 `bash scripts/setup-playwright-compat.sh`，在 `${CODEX_HOME:-$HOME/.codex}/skills/playwright/scripts` 创建指向本仓库 `skills/playwright/scripts` 的符号链接。可用第一个参数指定其他 Codex home。兼容目录不含 `SKILL.md`，所以不会新增重复技能。

兼容链接位于上游安装器管理的技能目录之外，因此 `npx skills update` 或重新安装全局 Playwright 时无需重做文件修改。链接指向稳定的目录路径，更新替换脚本文件后仍能解析。首次克隆仓库或换机器后运行一次配置脚本；若已有同名真实目录或不同链接，脚本会退出并保留原路径。仓库位置或 Codex home 改变后，需要重新配置对应链接。

迁移验证包括 Markdown 文件引用、原有文件完整性、Codex 全局技能列表，以及 Playwright 包装脚本的 `--help`。八个原始副本已移出 Codex 扫描目录；Playwright 旧路径仅保留脚本兼容链接，不保留技能清单或重复文件。
