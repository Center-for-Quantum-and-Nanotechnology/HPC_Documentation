# GPU Jobs

<span class="hpc-status hpc-status--validated">Operationally Validated</span>

Each compute node advertises one GPU as the generic resource
`gpu:quadro:1` (1× NVIDIA Quadro K2200, 4 GB VRAM). A scheduled GPU
allocation has been validated end-to-end through Slurm.

## Requirements

GPU jobs must request a GPU explicitly with `--gres=gpu:1` (or
`--gres=gpu:quadro:1`) — you don't get one by default.

## Quick GPU diagnostic

```bash
srun --partition=short-cpu --nodes=1 --ntasks=1 --gres=gpu:1 nvidia-smi
```

!!! warning
    `srun`/`sbatch` create real scheduler allocations even when used for
    a diagnostic like this. They're non-destructive normal scheduler
    operations, but they are not read-only — they consume queue time and
    resources like any other job.

## Basic GPU batch job

```bash
#!/bin/bash
#SBATCH --job-name=gpu_job
#SBATCH --partition=short-cpu
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --gres=gpu:1
#SBATCH --time=00:10:00
#SBATCH --output=gpujob%j.out

nvidia-smi
# your GPU workload here, e.g.:
# python train.py
```

Submit it the same way as any batch job:

```bash
sbatch gpu_job.sh
```

## CUDA toolkit

The installed CUDA toolkit is 12.9 (`nvcc` at `/usr/local/cuda/bin/nvcc`).
See [CUDA](../software/cuda.md) for module/toolchain details.

!!! note
    Don't run `nvidia-smi` directly on `head` expecting GPU output — the
    head node isn't a compute node and has no GPU driver context. Always
    check GPUs through a Slurm allocation on a compute node.

## See also

- [GPU Nodes](../cluster/gpu-nodes.md) for hardware specs
- [Multi-GPU workflows](../workflows/multi-gpu.md)
