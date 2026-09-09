# Jobs Failing

## 1. Read the output file first

Every batch job in this documentation writes an output file via
`#SBATCH --output=...`. Read it before anything else:

```bash
cat <job_name><JOBID>.out
```

## 2. Check the job's exit code

```bash
scontrol show job <JOBID>
```

Look for `ExitCode=`. `0:0` means the script itself exited successfully —
if your job still produced wrong results, the bug is in your program, not
Slurm.

## 3. Common causes

- **Module not loaded** — the script assumes software that isn't loaded
  in a fresh batch environment. Add explicit `module load` lines; see
  [Environment Modules](../software/modules.md).
- **Wrong working directory assumptions** — batch jobs start in the
  directory you submitted from (or wherever `#SBATCH --chdir` points).
  Use absolute paths or `cd` explicitly if unsure.
- **Killed for memory** — see [Out of Memory](out-of-memory.md).
- **GPU not requested** — a GPU program fails immediately if the job
  didn't request `--gres=gpu:1`; see [GPU Errors](gpu-errors.md).

!!! warning "Verification Required"
    A catalog of cluster-specific failure signatures (e.g. common node
    hardware faults, MPI stack mismatches) has not been compiled yet.
