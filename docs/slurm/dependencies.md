# Job Dependencies

Chain jobs so one only starts after another finishes — useful for
multi-stage pipelines (e.g. preprocess → train → evaluate).

```bash
first=$(sbatch --parsable preprocess.sh)
second=$(sbatch --parsable --dependency=afterok:$first train.sh)
sbatch --dependency=afterok:$second evaluate.sh
```

`--parsable` makes `sbatch` print just the job ID, which you can capture
and pass to the next job's `--dependency`.

## Common dependency types

| Type | Runs when |
|---|---|
| `afterok:<jobid>` | The dependency job completed successfully |
| `afternotok:<jobid>` | The dependency job failed |
| `afterany:<jobid>` | The dependency job finished, regardless of outcome |
| `after:<jobid>` | The dependency job has started |

Combine multiple dependencies with a colon, e.g.
`--dependency=afterok:123:456`.

See [Batch Jobs](batch-jobs.md) for the base submission workflow and
[Monitoring Jobs](monitoring.md) to track a dependency chain.
