# Scratch Storage

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

| Item | Value |
|---|---|
| Path | `/scratch/<USERNAME>` |
| Scope | Local to each individual compute node (`node2`–`node9`) |
| Shared | **No** — not exported via NFS |

## What to use it for

Temporary, job-local I/O that doesn't need to survive past the job or be
visible from other nodes — e.g. intermediate files a single job reads and
writes on the node it's running on.

!!! danger "Not visible across nodes"
    Data in `/scratch` on `node3` is not visible from `node4` or any other
    node. Multi-node workflows must use `/home` or explicitly transfer
    data between nodes — don't assume `/scratch` behaves like a shared
    filesystem.

!!! warning "Verification Required"
    Retention and automatic cleanup policy for `/scratch` is `TODO:
    VERIFY WITH HPC ADMINISTRATOR` — do not assume files are kept
    indefinitely, or that they're purged on any particular schedule. This
    is tracked on HPC staff's internal roadmap.

See [Home Directory](home.md) for shared, persistent storage.
