# Slurm

The cluster uses [Slurm](https://slurm.schedmd.com/) (version 25.11.0) to
schedule all user workloads across `node2`–`node9`.

- [Concepts](concepts.md) — how the scheduler is configured
- [Partitions](partitions.md) — available queues and their limits
- [Jobs Overview](jobs.md) — batch vs. interactive jobs
- [Interactive Jobs](interactive-jobs.md)
- [Batch Jobs](batch-jobs.md)
- [GPU Jobs](gpu-jobs.md)
- [Job Arrays](arrays.md)
- [Job Dependencies](dependencies.md)
- [Monitoring Jobs](monitoring.md)
- [Cancelling Jobs](cancellation.md)
- [Useful Commands](useful-commands.md) — a `squeue`/`sprio`/`sacct`/`scontrol` cheat sheet
- [Script Generator](script-generator.md) — build a batch script interactively

See [Command Reference](../reference/commands.md) for a quick lookup of
every Slurm command used on this cluster.
