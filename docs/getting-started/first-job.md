# Your First Job

<span class="hpc-status hpc-status--validated">Operationally Validated</span>

This walks through the same batch-job procedure that was used to validate
the cluster's Slurm workflow (Job ID 74, completed successfully on
`node2`).

## Prerequisites

- A working SSH connection (see [Connecting](connecting.md))
- A working directory under your shared `/home` directory

## Procedure

### 1. Create a working directory

```bash
mkdir -p ~/sop_test
cd ~/sop_test
```

### 2. Create a batch script

Create `sop_test.sh`:

```bash
#!/bin/bash
#SBATCH --job-name=sop_test
#SBATCH --partition=short-cpu
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --time=00:01:00
#SBATCH --output=soptest%j.out

echo "HPC SOP Slurm Validation Test"
echo "Job ID: $SLURM_JOB_ID"
echo "User: $USER"
echo "Compute Node: $(hostname)"
echo "Working Directory: $(pwd)"
echo "Date: $(date)"
echo "Allocated CPUs: $SLURM_CPUS_PER_TASK"
```

### 3. Submit the job

```bash
sbatch sop_test.sh
```

### 4. Check the queue

```bash
squeue -u "$USER"
```

### 5. Inspect the output

Once the job completes (`short-cpu` jobs run in under an hour and this
one finishes in about a second), read the output file:

```bash
cat soptest<JOBID>.out
```

## Expected result

The job completes with `ExitCode=0:0`, and the output file is written to
your working directory.

!!! note "Why does Slurm report more CPUs than I requested?"
    Requesting `--cpus-per-task=1` on this cluster's two-threads-per-core
    nodes can show up as an allocation of 2 logical CPUs — this reflects
    whole-core allocation, not an error. See
    [Environment Variables](../reference/environment-variables.md) for
    more on interpreting job resource reports.

!!! warning "Job accounting is disabled"
    `sacct` currently reports "Slurm accounting storage is disabled" on
    this cluster. Use `scontrol show job <JOBID>` for recent jobs the
    controller still retains — see
    [Monitoring Jobs](../slurm/monitoring.md).

Next: explore [Slurm Concepts](../slurm/concepts.md) or jump straight to
[Batch Jobs](../slurm/batch-jobs.md) for the full reference.
