# Jobs Overview

Slurm supports two main ways to run work on the cluster:

| Mode | Use when | Page |
|---|---|---|
| **Batch** | You have a script that runs unattended (the common case) | [Batch Jobs](batch-jobs.md) |
| **Interactive** | You need a live shell on a compute node (debugging, exploratory work) | [Interactive Jobs](interactive-jobs.md) |

Both are submitted against a [partition](partitions.md) and consume
CPU/memory/GPU resources tracked as consumable TRES (see
[Concepts](concepts.md)).

## The basic lifecycle

1. Write a batch script or choose an interactive command.
2. Submit it (`sbatch script.sh` or `srun`/`salloc`).
3. Check its status (`squeue -u "$USER"`) — see [Monitoring Jobs](monitoring.md).
4. Let it run to completion, or cancel it (`scancel <JOBID>`) — see
   [Cancelling Jobs](cancellation.md).
5. Inspect output/results.

For GPU work specifically, see [GPU Jobs](gpu-jobs.md). For running many
similar jobs, see [Job Arrays](arrays.md) and [Job Dependencies](dependencies.md).
