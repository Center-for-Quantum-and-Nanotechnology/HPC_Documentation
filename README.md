# SCSU HPC Documentation

Documentation-as-code for the Southern Connecticut State University High
Performance Computing (HPC) cluster: a [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)
site built from Markdown source under `docs/`. **This repository is
public** — it contains only researcher-facing documentation.

Privileged administrative content (MCMS root operations, backups, IPMI,
LDAP, security governance) lives in a separate, private companion repo,
`scsu-hpc-admin-docs`, not here. That repo is local-build-only (no GitHub
Pages deploy) — see its own README for why. If you're looking for the
original source SOP drafts, those moved there too.

**Status:** draft. Pages or values not yet confirmed by an HPC
administrator are marked `TODO: VERIFY WITH HPC ADMINISTRATOR` or carry a
"Verification Required" admonition — see [AGENTS.md](AGENTS.md) for the
rules this content follows.

## Layout

- `docs/` — the documentation content (source of truth): Getting Started,
  Cluster, Slurm, Software, Storage, Workflows, Troubleshooting, Policies,
  Reference.
- `config/cluster.yaml` — the single authoritative source for verified
  cluster-specific facts (hostnames, partitions, storage paths, versions).
- `mkdocs.yml` — site configuration, theme, and navigation.
- `docs/stylesheets/extra.css` — the visual design system (colors, type
  scale, reusable components). Lives under `docs/` because MkDocs
  resolves `extra_css` paths relative to `docs_dir`.
- `scripts/check_links.py` — internal link checker run against the built
  site.
- `hooks/download_button.py` + `docs/javascripts/download-button.js` —
  the per-page "Download" button (Markdown / PDF). See below.
- `docs/slurm/script-generator.md` + `docs/javascripts/script-generator.js`
  — the interactive Slurm batch-script builder. Its partition limits
  (`PARTITIONS` in the JS) are a hand-duplicated copy of
  `config/cluster.yaml` / `docs/slurm/partitions.md` — update all three
  together if a partition changes.

### The per-page Download button

Every page gets a "Download" control (top-right) with two options:

- **Markdown (.md)** — the raw page source, built client-side from a
  copy of the source embedded in the page by `hooks/download_button.py`
  at build time. No server-side file needed.
- **PDF** — calls the browser's own `window.print()` (Save as PDF),
  styled by the `@media print` rules in `docs/stylesheets/extra.css` to
  hide the nav/header/footer and print just the content.

This deliberately avoids adding a real PDF-rendering dependency (e.g.
WeasyPrint via `mkdocs-pdf-export-plugin`), which needs system-level
Pango/Cairo/GDK-pixbuf libraries that are painful to install on Windows
and would make `pip install -r requirements.txt` insufficient to build
this site. The tradeoff is a browser print dialog instead of an
instantly-downloaded pre-rendered PDF file. If that tradeoff stops being
acceptable (e.g. CI-only builds on Linux, where those libraries install
cleanly via `apt`), swapping in a real per-page PDF plugin is a contained
change — replace the hook + JS with the plugin and drop the print CSS.

## Building locally

```bash
python -m venv .venv
. .venv/Scripts/activate   # or: source .venv/bin/activate on macOS/Linux
pip install -r requirements.txt
mkdocs build --strict
```

Serve with live reload:

```bash
mkdocs serve
```

## Deployment

`.github/workflows/deploy.yml` runs `mkdocs gh-deploy --force` on every
push to `main`, publishing to the `gh-pages` branch. It's inert until a
GitHub remote exists and Pages is enabled for this repo (Settings → Pages
→ deploy from the `gh-pages` branch) — nothing deploys automatically
before that.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
