# Interactive Jobs

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

Use the `interactive-cpu` partition for a live shell on a compute node —
useful for debugging, exploratory data work, or testing before submitting
a large batch job.

## Limits on `interactive-cpu`

| Limit | Value |
|---|---|
| Max runtime | 2 days |
| Default runtime | 8 hours |
| Max nodes | 1 |
| Max CPUs/node | 12 |
| Max memory/node | ~32 GB |
| Oversubscribe | 2x |

## Starting an interactive session

```bash
srun --partition=interactive-cpu --nodes=1 --ntasks=1 --cpus-per-task=4 --pty bash
```

This requests a shell on a compute node with 4 CPUs, using the defaults
for everything else. Adjust `--cpus-per-task` and add `--mem=` up to the
partition limits above.

!!! tip
    Interactive sessions count against the `interactive-cpu` partition's
    resource limits the same way batch jobs do — exit the session
    (`exit` or `Ctrl-D`) when you're done so the allocation is released.

## Alternative: `salloc`

`salloc` allocates resources without immediately attaching a shell to
them — useful when you want to run multiple commands against the same
allocation:

```bash
salloc --partition=interactive-cpu --nodes=1 --ntasks=1 --cpus-per-task=4
```

Once granted, you're placed in a shell on the login node with the
allocation active; use `srun` within it to run commands on the allocated
compute node.

See [Batch Jobs](batch-jobs.md) for unattended workloads, and
[Cancelling Jobs](cancellation.md) to end a session early.
