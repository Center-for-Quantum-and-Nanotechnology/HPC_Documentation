# GPU Nodes

<span class="hpc-status hpc-status--validated">Operationally Validated</span>

Every compute node has one GPU, advertised to Slurm as the generic
resource `gpu:quadro:1`. A scheduled GPU allocation has been
successfully performed and returned `nvidia-smi` output from a compute
node.

| GPU item | Value |
|---|---|
| Model | NVIDIA Quadro K2200 |
| VRAM | 4096 MiB (4 GB) |
| Installed CUDA toolkit | 12.9 |
| GPUs per node | 1 |
| GPUs cluster-wide | 8 |

!!! note
    `nvidia-smi` run directly on the head/login node cannot communicate
    with an NVIDIA driver — it is not a compute node. Run GPU diagnostics
    through Slurm on a compute node instead; see [GPU Jobs](../slurm/gpu-jobs.md).

## Requesting a GPU

See [GPU Jobs](../slurm/gpu-jobs.md) for the Slurm submission syntax, and
[CUDA](../software/cuda.md) for the installed toolkit.
