# HPC Documentation Project

## Purpose

This repository contains the official documentation and SOPs
for the University High Performance Computing cluster.

## Repository Scope

**This repository is public.** It must only ever contain
researcher-facing documentation. Privileged administrative content
(MCMS root operations, backup/restore internals, IPMI, LDAP, security
governance, incident response) belongs in the separate private
companion repository (`scsu-hpc-admin-docs`), never here — even in
draft form, even temporarily. If a page needs to reference something
that lives there, describe it in plain text without a link (the target
doesn't exist in this repo's build).

## Source of Truth

Markdown files under `docs/` are the source of truth for
documentation content.

Do not place substantive documentation content directly
inside HTML templates.

## Accuracy Requirements

Never invent:

- cluster hostnames
- partition names
- filesystem paths
- storage quotas
- CPU/GPU specifications
- SLURM limits
- software versions
- module names
- university policies
- security procedures

If information is unknown, use:

`TODO: VERIFY WITH HPC ADMINISTRATOR`

rather than guessing.

## Writing Style

Documentation should be:

- concise
- technically precise
- task-oriented
- accessible to new HPC users
- useful to experienced researchers

Prefer direct instructions.

Use:

"Run the following command."

Instead of:

"The following command can be utilized."

## Code Examples

All shell commands must be tested before being described
as verified.

Do not fabricate command output.

## Design

Follow the visual system defined in:

- stylesheets/
- this AGENTS.md
- mkdocs.yml

Do not introduce arbitrary colors or typography.

## Changes

Before modifying the documentation:

1. Inspect the existing structure.
2. Reuse existing components.
3. Preserve navigation consistency.
4. Check links.
5. Build the site.
6. Fix build warnings.
7. Summarize changes.

## Content Status

When content is uncertain, mark it clearly:

!!! warning "Verification Required"
    This section requires verification by HPC administrators.