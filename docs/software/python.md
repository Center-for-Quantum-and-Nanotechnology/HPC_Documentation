# Python

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

| Item | Verified value |
|---|---|
| Python | 3.12.12 |
| Conda | 2025.12 (available as a module) |

## Using Python via modules

```bash
module load python/3.12
python3 --version
```

!!! warning "Verification Required"
    The exact module name/version string is `TODO: VERIFY WITH HPC
    ADMINISTRATOR` — confirm with `module avail python` before relying on
    a specific name in scripts.

## Using Conda

```bash
module load conda
conda create -n myenv python=3.12
conda activate myenv
```

Run Conda environments inside Slurm jobs the same way — activate the
environment in your batch script before running your program:

```bash
#!/bin/bash
#SBATCH --job-name=python_job
#SBATCH --partition=short-cpu
#SBATCH --time=00:10:00

module load conda
conda activate myenv
python train.py
```

!!! warning "Verification Required"
    Whether per-user Conda environments should live under `/home` or a
    dedicated project storage location, and any package-cache quota
    implications, are pending confirmation — see [Storage](../storage/index.md).
