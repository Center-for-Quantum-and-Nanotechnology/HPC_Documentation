# Cancelling Jobs

Cancel a specific job by ID:

```bash
scancel <JOBID>
```

Cancel every job you own:

```bash
scancel -u "$USER"
```

Cancel all your jobs in a specific partition:

```bash
scancel -u "$USER" --partition=short-cpu
```

Cancel an entire job array or a single array task:

```bash
scancel <ARRAY_JOB_ID>          # whole array
scancel <ARRAY_JOB_ID>_<TASK_ID> # single task
```

## Confirming cancellation

```bash
squeue -u "$USER"
```

A cancelled job disappears from the queue (or shows `CANCELLED` state
briefly). See [Monitoring Jobs](monitoring.md).

Need to pause a job instead of cancelling it outright? See `scontrol
suspend`/`resume` in [Useful Commands](useful-commands.md#extended-job-control-with-scontrol).
