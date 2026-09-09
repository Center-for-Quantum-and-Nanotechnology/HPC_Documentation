#!/usr/bin/env python3
"""Check internal links in the built MkDocs site.

Walks every .html file under the built site directory, extracts local
href/src targets, and reports any that don't resolve to a file on disk.
External (http/https/mailto) links are skipped.

Usage:
    python scripts/check_links.py [site_dir]
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import urlsplit

LINK_RE = re.compile(r'''(?:href|src)=["']([^"']+)["']''')
SKIP_SCHEMES = ("http:", "https:", "mailto:", "tel:", "javascript:")


def resolve_target(html_file: Path, target: str, site_dir: Path) -> Path | None:
    if target.startswith("#") or not target:
        return None
    if target.startswith(SKIP_SCHEMES) or "://" in target:
        return None

    path_part = urlsplit(target).path
    if not path_part:
        return None

    if path_part.startswith("/"):
        candidate = site_dir / path_part.lstrip("/")
    else:
        candidate = (html_file.parent / path_part).resolve()

    if candidate.is_dir():
        candidate = candidate / "index.html"

    return candidate


def main() -> int:
    site_dir = Path(sys.argv[1] if len(sys.argv) > 1 else "site").resolve()
    if not site_dir.is_dir():
        print(f"error: site directory not found: {site_dir}", file=sys.stderr)
        print("Run `mkdocs build` first.", file=sys.stderr)
        return 2

    broken: list[tuple[Path, str]] = []
    checked = 0

    for html_file in site_dir.rglob("*.html"):
        text = html_file.read_text(encoding="utf-8", errors="ignore")
        for target in LINK_RE.findall(text):
            resolved = resolve_target(html_file, target, site_dir)
            checked += 1
            if resolved is None:
                continue
            if not resolved.exists():
                broken.append((html_file.relative_to(site_dir), target))

    print(f"Checked {checked} link references across the built site.")
    if broken:
        print(f"\n{len(broken)} broken internal link(s):\n")
        for source, target in broken:
            print(f"  {source} -> {target}")
        return 1

    print("No broken internal links found.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
