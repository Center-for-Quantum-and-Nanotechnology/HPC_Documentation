# Contributing

This is a documentation-as-code project. Content changes are Markdown
changes; the site is a build artifact.

## Before you start

Read [AGENTS.md](AGENTS.md). In short: never invent cluster-specific facts
(hostnames, partitions, paths, quotas, hardware specs, Slurm limits,
software versions, policies, security procedures). If a value isn't
confirmed, write `TODO: VERIFY WITH HPC ADMINISTRATOR` instead of guessing.

## Workflow

1. Edit or add Markdown under `docs/`. Add new pages to the `nav:` section
   of `mkdocs.yml` — a page not in `nav` won't appear in the sidebar.
2. If you're adding a cluster-specific fact, add or update the
   corresponding value in `config/cluster.yaml` so it stays the single
   source of truth.
3. Build the site and fix any warnings:

   ```bash
   mkdocs build --strict
   ```

4. Run the link checker:

   ```bash
   python scripts/check_links.py site
   ```

5. Preview with `mkdocs serve` and check the page renders as expected
   (sidebar entry, admonitions, code blocks).

## Content status

Every page describing a procedure or fact that hasn't been verified by an
HPC administrator should carry:

```markdown
!!! warning "Verification Required"
    This section requires verification by HPC administrators.
```

## Style

- Direct, task-oriented instructions ("Run the following command.").
- One `h1` per page, matching the nav entry.
- Shell commands in fenced ` ```bash ` blocks so the copy button works.
- Use the `!!! info`, `!!! tip`, `!!! warning`, `!!! danger`, `!!! example`
  admonitions for callouts — don't invent new visual patterns.
