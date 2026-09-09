# GPU Nodes

<span class="hpc-status hpc-status--validated">Operationally Validated</span>

Every compute node (`node2`–`node9`) has one GPU, advertised to Slurm as
the generic resource `gpu:quadro:1`. A scheduled GPU allocation has been
successfully performed and returned `nvidia-smi` output from a compute
node.

| GPU item | Value |
|---|---|
| Model | NVIDIA Quadro K2200 |
| VRAM | 4096 MiB (4 GB) |
| Driver | 580.126.09 |
| Driver-reported CUDA compatibility | 13.0 |
| Installed CUDA toolkit | 12.9 |
| Persistence mode | On |
| GPUs per node | 1 |
| GPUs cluster-wide | 8 |

!!! note
    `nvidia-smi` run directly on `head` cannot communicate with an NVIDIA
    driver — `head` is not a compute node. Run GPU diagnostics through
    Slurm on a compute node instead; see [GPU Jobs](../slurm/gpu-jobs.md).

## Requesting a GPU

See [GPU Jobs](../slurm/gpu-jobs.md) for the Slurm submission syntax, and
[CUDA](../software/cuda.md) for the installed toolkit.
