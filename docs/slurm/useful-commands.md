# Useful Commands

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

A consolidated cheat sheet for the Slurm commands you'll reach for most
often once the basics from [Batch Jobs](batch-jobs.md) and
[Monitoring Jobs](monitoring.md) aren't enough — checking your place in
the queue, cancelling something, and pulling per-job resource stats.

## Queue information with `squeue`

The default view, scoped to yourself:

```bash
squeue -u "$USER"
```

Non-abbreviated output, including a time-limit column:

```bash
squeue -u "$USER" --long
```

Slurm's estimate of when a pending job will start:

```bash
squeue -u "$USER" --start
```

!!! note
    A `squeue --start` estimate is only as good as the queue at the
    moment you ran it — a higher-priority job queued afterward can push
    your estimated start time back. Treat it as a rough guide, not a
    promise. See [Jobs Pending](../troubleshooting/jobs-pending.md).

Repeat the query automatically instead of re-running it by hand:

```bash
squeue -u "$USER" --start --iterate=60
```

`Ctrl-C` stops the loop. Don't set `--iterate` below about 60 seconds —
polling the controller faster than that adds load for no real benefit on
a queue this size.

## Priority insight with `sprio`

`sprio` shows the priority score behind each of your pending jobs,
broken down by contributing factor, so you can see why one job is ahead
of another in the same partition:

```bash
sprio -u "$USER"
```

Sort by priority (highest first) and restrict to one partition:

```bash
sprio -S '-Y' -p short-cpu
```

!!! warning "Verification Required"
    Which priority factors actually carry weight on this cluster is
    `TODO: VERIFY WITH HPC ADMINISTRATOR`. The partition priority factors
    in [Partitions](partitions.md) are confirmed, but whether fairshare
    is meaningfully tracked is uncertain given that persistent accounting
    is currently disabled (see [Concepts](concepts.md)) — fairshare
    normally depends on historical usage data from the accounting
    database.

## Cancelling jobs with `scancel`

Covered in full at [Cancelling Jobs](cancellation.md) — the short
version:

```bash
scancel <JOBID>          # one job
scancel -u "$USER"       # everything you own
```

## Live job stats with `sstat`

`sstat` reports point-in-time resource usage (CPU time, memory, task
count) for a job that's currently running:

```bash
sstat --jobs=<JOBID> --format=jobid,avecpu,maxrss,ntasks
```

!!! warning "Verification Required"
    `sstat` needs a full job step ID (e.g. `<JOBID>.0`), or the `-a`
    flag, to return anything for a multi-step job. More importantly,
    whether `sstat` returns meaningful data on this cluster at all is
    `TODO: VERIFY WITH HPC ADMINISTRATOR` — the SOP draft only confirms
    that `JobAcctGatherType` was not configured at discovery time, which
    `sstat` normally depends on.

## Historical job stats with `sacct`

`sacct` is the historical counterpart to `sstat` — job accounting
records after a job has finished.

```bash
sacct --jobs=<JOBID>
sacct -u "$USER" --starttime=2026-08-01
```

!!! danger "Not usable on this cluster today"
    `sacct` currently returns `Slurm accounting storage is disabled` —
    see [Concepts](concepts.md). Enabling persistent accounting is
    tracked on HPC staff's internal roadmap. Until then, use
    `scontrol show job <JOBID>` for a job the controller still retains
    recently (see below) — it's not a replacement for `sacct`'s
    historical record, just what's available today.

## Extended job control with `scontrol`

<span class="hpc-status hpc-status--validated">Operationally Validated</span>

Full detail on a specific job — the one command from this page that's
been exercised on this cluster (see [Batch Jobs](batch-jobs.md)):

```bash
scontrol show job <JOBID>
```

`scontrol` also exposes job-control actions that are standard Slurm
functionality but **have not been tested on this cluster**:

```bash
scontrol hold <JOBID>      # prevent a pending job from being scheduled
scontrol release <JOBID>   # release a held job
scontrol suspend <JOBID>   # pause a running job in place
scontrol resume <JOBID>    # resume a suspended job
```

!!! warning
    Use `hold`/`release`/`suspend`/`resume` with care on a running
    production job — confirm the behavior on a low-impact test job first
    if you haven't used them on this cluster before. Whether these
    actions are restricted to job owners vs. administrators only is
    `TODO: VERIFY WITH HPC ADMINISTRATOR`.

## See also

[Command Reference](../reference/commands.md) has the quick
synopsis/options/examples format for every command used across this
documentation, not just Slurm's.
