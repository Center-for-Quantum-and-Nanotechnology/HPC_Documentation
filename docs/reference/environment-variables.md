# Environment Variables

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

Variables Slurm sets inside a running job, confirmed from the validated
test job (see [Your First Job](../getting-started/first-job.md)):

| Variable | Meaning |
|---|---|
| `$SLURM_JOB_ID` | The current job's ID |
| `$SLURM_CPUS_PER_TASK` | CPUs allocated per task (from `--cpus-per-task`) |
| `$SLURM_NTASKS` | Total number of tasks requested |
| `$SLURM_ARRAY_JOB_ID` | Base job ID for an array job (see [Job Arrays](../slurm/arrays.md)) |
| `$SLURM_ARRAY_TASK_ID` | This task's index within the array |
| `$USER` | Your HPC username (standard shell variable, not Slurm-specific) |

## Example usage

```bash
echo "Job ID: $SLURM_JOB_ID"
echo "User: $USER"
echo "Compute Node: $(hostname)"
echo "Allocated CPUs: $SLURM_CPUS_PER_TASK"
```

!!! note "Interpreting allocated CPUs"
    On this cluster's two-threads-per-core nodes, requesting
    `--cpus-per-task=1` can result in Slurm reporting an allocation of 2
    logical CPUs — this reflects whole-core allocation, not an error. See
    [Batch Jobs](../slurm/batch-jobs.md).
