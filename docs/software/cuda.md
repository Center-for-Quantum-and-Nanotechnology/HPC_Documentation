# CUDA

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

| Item | Verified value |
|---|---|
| CUDA toolkit | 12.9 |
| `nvcc` path | `/usr/local/cuda/bin/nvcc` |

## Checking the toolkit

```bash
/usr/local/cuda/bin/nvcc --version
```

## Using CUDA in a GPU job

```bash
#!/bin/bash
#SBATCH --job-name=cuda_job
#SBATCH --partition=short-cpu
#SBATCH --gres=gpu:1
#SBATCH --time=00:10:00

/usr/local/cuda/bin/nvcc --version
nvidia-smi
```

!!! note
    The installed driver may report a newer CUDA compatibility than the
    installed toolkit — build and run against the toolkit version (12.9)
    unless you've separately confirmed compatibility with a newer CUDA
    release.

See [GPU Jobs](../slurm/gpu-jobs.md) for the full submission workflow and
[GPU Nodes](../cluster/gpu-nodes.md) for hardware specs.
