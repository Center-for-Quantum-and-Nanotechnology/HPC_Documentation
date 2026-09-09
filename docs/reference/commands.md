# Command Reference

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

Quick reference for the commands used throughout this documentation.

---

## `sbatch`

Submit a batch script to Slurm.

**Synopsis**

```bash
sbatch [OPTIONS] SCRIPT
```

**Description**

`sbatch` submits a batch script to the Slurm scheduler and returns
immediately with a job ID; the script runs unattended when resources are
available.

**Common options**

| Option | Description |
|---|---|
| `--partition` | Select a [partition](../slurm/partitions.md) |
| `--time` | Set the maximum runtime |
| `--mem` / `--mem-per-cpu` | Request memory |
| `--cpus-per-task` | Request CPU cores |
| `--gres` | Request generic resources (e.g. `gpu:1`) |
| `--output` | Path for the job's stdout/stderr |
| `--parsable` | Print just the job ID (useful for scripting/dependencies) |

**Examples**

```bash
sbatch myjob.sh
sbatch --parsable myjob.sh
```

**See also:** [`srun`](#srun), [`salloc`](#salloc), [`squeue`](#squeue)

---

## `srun`

Run a command as a Slurm job step, or launch an interactive shell.

**Synopsis**

```bash
srun [OPTIONS] COMMAND
```

**Examples**

```bash
# Interactive shell on the interactive-cpu partition
srun --partition=interactive-cpu --nodes=1 --cpus-per-task=4 --pty bash

# GPU diagnostic (creates a real, non-destructive allocation)
srun --partition=short-cpu --nodes=1 --ntasks=1 --gres=gpu:1 nvidia-smi
```

**See also:** [`sbatch`](#sbatch), [`salloc`](#salloc)

---

## `salloc`

Allocate resources without immediately attaching a shell to them.

**Synopsis**

```bash
salloc [OPTIONS]
```

**Example**

```bash
salloc --partition=interactive-cpu --nodes=1 --cpus-per-task=4
```

**See also:** [Interactive Jobs](../slurm/interactive-jobs.md)

---

## `squeue`

Show queued and running jobs.

**Synopsis**

```bash
squeue [OPTIONS]
```

**Examples**

```bash
squeue -u "$USER"
```

**See also:** [Monitoring Jobs](../slurm/monitoring.md), [Useful Commands](../slurm/useful-commands.md)

---

## `sprio`

Show the priority score behind pending jobs, broken down by factor.

**Synopsis**

```bash
sprio -u "$USER"
sprio -S '-Y' -p <PARTITION>
```

**See also:** [Useful Commands](../slurm/useful-commands.md#priority-insight-with-sprio)

---

## `scancel`

Cancel a job.

**Synopsis**

```bash
scancel [OPTIONS] [JOBID]
```

**Examples**

```bash
scancel <JOBID>
scancel -u "$USER"
```

**See also:** [Cancelling Jobs](../slurm/cancellation.md)

---

## `sstat`

Live resource usage (CPU, memory) for a currently running job.

**Synopsis**

```bash
sstat --jobs=<JOBID> --format=jobid,avecpu,maxrss,ntasks
```

**See also:** [Useful Commands](../slurm/useful-commands.md#live-job-stats-with-sstat) — includes a caveat on whether this returns data on this cluster.

---

## `sacct`

Historical job accounting records.

<span class="hpc-status hpc-status--pending">Not usable on this cluster today</span>

**Synopsis**

```bash
sacct --jobs=<JOBID>
```

**Note:** currently returns `Slurm accounting storage is disabled` on
this cluster — use `scontrol show job <JOBID>` for a job the controller
still retains recently, instead. Enabling persistent accounting is
tracked on HPC staff's internal roadmap.

---

## `scontrol`

Query or modify Slurm state.

**Synopsis**

```bash
scontrol show job <JOBID>
```

**Note:** on this cluster, persistent job accounting is disabled — use
`scontrol show job <JOBID>` for jobs the controller still retains
recently, rather than `sacct`.

**See also:** [Useful Commands](../slurm/useful-commands.md#extended-job-control-with-scontrol) — includes `hold`/`release`/`suspend`/`resume`, untested on this cluster.

---

## `sinfo`

Show cluster and partition status.

**Synopsis**

```bash
sinfo
sinfo -N -l
```

`sinfo -N -l` shows detail per node — useful to check current node state
rather than relying on a possibly stale `Reason` field.

---

## `module`

Manage environment modules (Lmod).

**Synopsis**

```bash
module avail
module list
module load <name>
module unload <name>
module purge
```

**See also:** [Environment Modules](../software/modules.md)

---

## Service status (administrators)

```bash
systemctl status slurmctld --no-pager
systemctl status munge --no-pager
systemctl status nfs-server --no-pager
```
