# Batch Jobs

<span class="hpc-status hpc-status--validated">Operationally Validated</span>

Status: validated on 2026-08-24 (test Job ID 74, executed successfully on
`node2`).

## Purpose

Submit a script to Slurm to run unattended, without holding a live
connection open.

## Prerequisites

- An active HPC account and SSH access (see [Getting Started](../getting-started/index.md))
- A working directory under your shared `/home` directory

## Procedure

### 1. Create a working directory

```bash
mkdir -p ~/myjob
cd ~/myjob
```

### 2. Write the batch script

!!! tip
    The [Script Generator](script-generator.md) builds this step for you
    interactively if you'd rather not write `#SBATCH` flags by hand.

```bash
#!/bin/bash
#SBATCH --job-name=my_job
#SBATCH --partition=short-cpu
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --time=00:10:00
#SBATCH --output=myjob%j.out

echo "Job ID: $SLURM_JOB_ID"
echo "Node: $(hostname)"
# your commands here
```

Choose `--partition` from the options in [Partitions](partitions.md), and
set `--time` to no more than that partition's max runtime.

### 3. Submit

```bash
sbatch myjob.sh
```

Slurm prints the assigned job ID.

### 4. Monitor

```bash
squeue -u "$USER"
```

See [Monitoring Jobs](monitoring.md) for more.

### 5. Inspect results

```bash
cat myjob<JOBID>.out
```

## Expected result

The job appears in the queue, runs on an assigned compute node, and
writes its output file back to your shared `/home` working directory —
visible from `head` immediately after the job completes.

## Verified example

The validation job requested `--cpus-per-task=1` and the default 512 MB
memory (via TRES), and Slurm reported an allocation of 2 logical CPUs and
1 GB — consistent with whole-core allocation on this cluster's
two-thread-per-core nodes. Expect this when interpreting your own job's
resource report.

## Troubleshooting

If the job stays pending, see [Jobs Pending](../troubleshooting/jobs-pending.md).
If it fails, see [Jobs Failing](../troubleshooting/jobs-failing.md).
