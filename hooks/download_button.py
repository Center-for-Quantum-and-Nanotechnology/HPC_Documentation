"""MkDocs build hook: adds a per-page "Download" button (Markdown / PDF).

Captures each page's raw Markdown source in on_page_markdown, then
prepends a small download-menu widget to the rendered HTML in
on_page_content, embedding that raw source as inline JSON. The actual
download behavior lives client-side in
docs/javascripts/download-button.js:

- "Markdown (.md)" builds a Blob from the embedded raw source and
  triggers a browser download — no server-side file needed.
- "PDF" calls window.print(), so the browser's own Save-as-PDF handles
  rendering, styled by the @media print rules in
  docs/stylesheets/extra.css.

This avoids adding a PDF-rendering dependency (e.g. WeasyPrint, which
needs system-level Pango/Cairo/GDK-pixbuf libraries that are painful to
install on Windows) to the build — the tradeoff is a browser print
dialog instead of an instantly-downloaded pre-rendered PDF file. See
README.md for the full rationale.
"""
from __future__ import annotations

import json
import re

# Font Awesome Free ("download", "file", "file-pdf") icon paths, matching
# CU Boulder Research Computing's docs download menu. Each `d` value is
# kept as a single unbroken string deliberately — splitting a long SVG
# path across concatenated string literals is an easy way to silently
# drop a separating space and corrupt the path.
_ICON_DOWNLOAD_D = "M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"  # noqa: E501
_ICON_MARKDOWN_D = "M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"  # noqa: E501
_ICON_PDF_D = "M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"  # noqa: E501


def _icon(viewbox: str, width: str, height: str, d: str) -> str:
    return (
        f'<svg viewBox="{viewbox}" width="{width}" height="{height}" '
        'aria-hidden="true" focusable="false">'
        f'<path fill="currentColor" d="{d}"/></svg>'
    )


ICON_DOWNLOAD = _icon("0 0 512 512", "14", "14", _ICON_DOWNLOAD_D)
ICON_MARKDOWN = _icon("0 0 384 512", "11", "14", _ICON_MARKDOWN_D)
ICON_PDF = _icon("0 0 512 512", "14", "14", _ICON_PDF_D)


def _slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "page"


def on_page_markdown(markdown, page, config, files):
    # Stash the raw source on the page object so on_page_content (called
    # right after this page is rendered to HTML) can embed it.
    page.hpc_raw_markdown = markdown
    return markdown


def on_page_content(html, page, config, files):
    raw = getattr(page, "hpc_raw_markdown", None)
    if raw is None:
        return html

    title = page.title or page.file.name
    filename = f"{_slugify(str(title))}.md"

    payload = json.dumps({"filename": filename, "content": raw})
    # Defensive: json.dumps doesn't escape "/", so a literal "</script"
    # inside the source (e.g. a code sample) would close the element
    # early even though it's inert JSON text, not executable JS. "\/" is
    # a valid JSON escape for "/", so this round-trips through
    # JSON.parse() unchanged.
    payload = payload.replace("</", "<\\/")

    widget = (
        '<div class="hpc-download-menu">'
        '<button type="button" class="hpc-download-toggle" '
        'aria-haspopup="true" aria-expanded="false">'
        f"{ICON_DOWNLOAD}<span>Download</span>"
        "</button>"
        '<ul class="hpc-download-list" hidden>'
        '<li><button type="button" data-format="md">'
        f"{ICON_MARKDOWN}<span>Markdown (.md)</span>"
        "</button></li>"
        '<li><button type="button" data-format="pdf">'
        f"{ICON_PDF}<span>PDF</span>"
        "</button></li>"
        "</ul>"
        f'<script type="application/json" class="hpc-raw-markdown">{payload}</script>'
        "</div>"
    )

    return widget + html
