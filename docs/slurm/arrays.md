# Job Arrays

Use a job array to submit many similar jobs (e.g. the same script over a
range of inputs) as a single submission.

```bash
#!/bin/bash
#SBATCH --job-name=array_job
#SBATCH --partition=short-cpu
#SBATCH --array=1-10
#SBATCH --time=00:10:00
#SBATCH --output=array_%A_%a.out

echo "Array job $SLURM_ARRAY_JOB_ID, task $SLURM_ARRAY_TASK_ID"
# use $SLURM_ARRAY_TASK_ID to select input, e.g.:
# python process.py --input data/$SLURM_ARRAY_TASK_ID.csv
```

Submit it like any batch script:

```bash
sbatch array_job.sh
```

`%A` expands to the array's job ID and `%a` to the individual task index
in the output filename, so each task gets its own output file.

## Limiting concurrency

Cap how many array tasks run at once with `%`, e.g. `--array=1-100%10`
runs at most 10 tasks concurrently — useful to avoid monopolizing a
partition.

!!! warning "Verification Required"
    Any cluster-specific maximum array size (`MaxArraySize` in
    `slurm.conf`) has not been confirmed. If your array submission is
    rejected for being too large, contact your HPC administrator.

See [Partitions](partitions.md) for runtime limits that apply to each
task, and [Monitoring Jobs](monitoring.md) to check array task status.
