# Partitions

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

| Partition | Max runtime | Notable limits / behavior |
|---|---|---|
| `short-cpu` | 1 hour | Default partition; priority factor 40,000 |
| `day-long-cpu` | 1 day | Priority factor 20,000 |
| `week-long-cpu` | 7 days | Max 6 nodes/job; priority factor 10,000 |
| `month-long-cpu` | 31 days | Max 4 nodes/job; priority factor 5,000 |
| `interactive-cpu` | 2 days | Default runtime 8h; max 1 node; max 12 CPUs/node; ~32 GB/node; 2x oversubscribe; highest observed priority |

Select a partition with `--partition=<name>` in your batch script or
`srun`/`salloc` command — see [Batch Jobs](batch-jobs.md) and
[Interactive Jobs](interactive-jobs.md).

## Choosing a partition

- Quick tests or short runs: `short-cpu` (the default if you don't
  specify one).
- Anything under a day: `day-long-cpu`.
- Multi-day runs up to 6 nodes: `week-long-cpu`.
- Long-running jobs up to 4 nodes: `month-long-cpu`.
- Interactive sessions (debugging, development): `interactive-cpu` — see
  [Interactive Jobs](interactive-jobs.md).

!!! note "Stale node status"
    Node records have retained historical "Not responding" reason text
    for specific nodes while their current state was `IDLE`. Don't treat
    a retained `Reason` field alone as proof a node is currently down —
    check current state with `sinfo -N -l` before assuming a node is
    unavailable.
