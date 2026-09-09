# Jobs Pending

Check why a job hasn't started:

```bash
squeue -u "$USER"
scontrol show job <JOBID>
```

Look at the `REASON` column in `squeue` output, or the `Reason=` field
from `scontrol`.

## Common reasons on this cluster

| Reason | What it means here |
|---|---|
| `Priority` | Other queued jobs have higher priority. `interactive-cpu` has the highest observed priority, then `short-cpu` (40,000), `day-long-cpu` (20,000), `week-long-cpu` (10,000), `month-long-cpu` (5,000) — see [Partitions](../slurm/partitions.md). |
| `Resources` | The cluster doesn't currently have enough free CPU/memory/GPU to satisfy your request. |
| `PartitionTimeLimit` | Your `--time` request exceeds the partition's max runtime — see [Partitions](../slurm/partitions.md). |

!!! note
    A node's stale `Reason` text (e.g. old "Not responding" entries) does
    not necessarily mean it's unavailable now — check current state with
    `sinfo -N -l` rather than assuming.

## Requesting less

If your job is stuck behind higher-priority or resource-heavy jobs,
consider requesting fewer resources or a shorter `--time`, or switching
to a lower-priority/longer-window partition if your job doesn't need to
start immediately.

See [Monitoring Jobs](../slurm/monitoring.md) for the full command set.
