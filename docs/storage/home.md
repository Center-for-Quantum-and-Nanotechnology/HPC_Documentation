# Home Directory

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

| Item | Value |
|---|---|
| Path | `/home/<USERNAME>` |
| Size (filesystem total) | 6 TB |
| Shared | Yes — exported by NFS (NFSv4.2), visible on `head` and all compute nodes |

## What to use it for

Scripts, source code, normal datasets, and results you want retained,
subject to university policy (see [Data Management](../policies/data-management.md)).

Because `/home` is shared, output written by a job on any compute node is
immediately visible from `head` and every other node — this is why batch
job output files land here reliably (see [Batch Jobs](../slurm/batch-jobs.md)).

!!! warning "Verification Required"
    Per-user quota on `/home` is `TODO: VERIFY WITH HPC ADMINISTRATOR` —
    see [Quotas](quotas.md).

## Checking your usage

```bash
du -sh ~
```

See [Scratch Storage](scratch.md) for job-local temporary storage instead.
