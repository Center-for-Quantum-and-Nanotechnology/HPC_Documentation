# Monitoring Jobs

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

## Your current jobs

```bash
squeue -u "$USER"
```

## Detail on a specific job

```bash
scontrol show job <JOBID>
```

`scontrol` only shows detail for jobs the controller still retains
recently — it's not a historical record.

## Cluster and node status

```bash
sinfo
sinfo -N -l
```

`sinfo -N -l` breaks status down per node — use it to check whether a
node is actually down before assuming a stale `Reason` field means
trouble (see [Partitions](partitions.md)).

!!! warning "Accounting is disabled"
    `sacct` currently returns `Slurm accounting storage is disabled` on
    this cluster — it will not show historical job records. Use
    `scontrol show job <JOBID>` while the controller still retains the
    job — enabling persistent accounting is tracked on HPC staff's
    internal roadmap.

## Service health (administrators)

```bash
systemctl status slurmctld --no-pager
systemctl status munge --no-pager
```

See [Useful Commands](useful-commands.md) for `sprio`, `sstat`, and more
`squeue`/`scontrol` flags, or [Command Reference](../reference/commands.md)
for the full quick list.
