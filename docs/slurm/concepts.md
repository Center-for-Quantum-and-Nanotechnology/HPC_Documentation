# Concepts

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

| Item | Configuration |
|---|---|
| Cluster name | `microway` |
| Slurm version | 25.11.0 |
| Controller | `head` |
| Authentication | MUNGE |
| Scheduler | Backfill |
| Resource selection | Consumable TRES |
| Default memory request | 512 MB per CPU |
| Configuration file | `/etc/slurm/slurm.conf` |
| Controller log | `/var/log/slurm/slurmctld.log` |
| Compute daemon log | `/var/log/slurmd/slurmd.log` |
| Persistent accounting | Disabled |

## What "backfill" and "consumable TRES" mean here

Backfill scheduling lets Slurm start smaller/shorter jobs ahead of larger
queued jobs when doing so won't delay the larger job's expected start —
useful for keeping the cluster utilized between big allocations.
Consumable TRES (Trackable RESources) means CPU, memory, and GPU are
tracked and allocated per job rather than whole nodes being handed out
regardless of what's requested.

## Accounting is disabled

`sacct` currently returns `Slurm accounting storage is disabled` on this
cluster. Use `scontrol show job <JOBID>` for jobs the controller still
retains recently — see [Monitoring Jobs](monitoring.md). Persistent
accounting (e.g. via SlurmDBD) is an open item tracked on HPC staff's
internal roadmap.

## Next

- [Partitions](partitions.md) for available queues and limits.
- [Batch Jobs](batch-jobs.md) for the validated submission workflow.
