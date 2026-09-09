# GPU Errors

## "No GPU available" / CUDA can't find a device

The most common cause: the job didn't request a GPU. Add
`--gres=gpu:1` — see [GPU Jobs](../slurm/gpu-jobs.md).

```bash
srun --partition=short-cpu --nodes=1 --ntasks=1 --gres=gpu:1 nvidia-smi
```

If this diagnostic also fails to show a GPU, the issue may be with the
node itself — report the job ID and node to your HPC administrator.

## `nvidia-smi` shows nothing on `head`

Expected — `head` is not a compute node and has no GPU driver context.
Always check GPUs through a Slurm allocation on a compute node, not
directly on `head`. See [Login Node](../cluster/login-node.md).

## Out of GPU memory

Each node's GPU has 4 GB VRAM (see [GPU Nodes](../cluster/gpu-nodes.md))
— a hard ceiling. Reduce batch size or model size; there's no larger-VRAM
GPU tier currently available on this cluster.

## CUDA/driver version mismatch

Installed toolkit is CUDA 12.9; driver reports compatibility up to 13.0.
Build against 12.9 unless you've separately confirmed a newer CUDA
release works. See [CUDA](../software/cuda.md).
