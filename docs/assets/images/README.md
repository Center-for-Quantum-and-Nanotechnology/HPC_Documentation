# Images

Drop screenshots and diagrams here as the SOP content gets filled in.
This folder isn't a documentation page itself (it's excluded from `nav`
in `mkdocs.yml`), just an asset bucket.

## Convention

- One subfolder per tool/section — `PuTTY/`, `WinSCP/`, and so on — with
  descriptive lowercase filenames inside it.
- PNG for screenshots (JPG is fine too), SVG for diagrams where possible.
- **Redact before dropping in a file**: no real passwords, no visible SSH
  port, no unredacted lists of usernames. See `AGENTS.md`.

## Referencing an image from a page

Every content page lives one level under `docs/` (e.g.
`docs/software/putty.md`), so the relative path back to this folder is
`../assets/images/<Subfolder>/<file>.png`:

```markdown
![Alt text describing the screenshot](../assets/images/PuTTY/putty_session.png)
```

`mkdocs build --strict` fails the build on an image reference that
doesn't resolve to a real file — add the `![...]()` line only once the
file actually exists here, not before.

## Status

| Subfolder | Wired into a page? |
|---|---|
| `PuTTY/` | Yes — embedded in `docs/software/putty.md` and `docs/getting-started/connecting.md` |
| `WinSCP/` | Yes — embedded in `docs/software/winscp.md` |

Adding screenshots for a different page? Create a subfolder named after
the tool/section, drop the files in, and add a row here.

!!! note
    MCMS/admin screenshots live in the companion private repo
    (`scsu-hpc-admin-docs`), not here — this repo is public.
