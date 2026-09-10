# Hardware

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

## Head / login node

A dedicated server used for login, job submission, the Slurm scheduler,
and shared storage — see [Login Node](login-node.md). It is not part of
the compute pool, and since users never request resources on it
directly, its detailed specifications aren't published here.

Shared home storage (`/home`) is available cluster-wide — see
[Storage](../storage/index.md).

## Compute nodes

| Resource | Per node | Cluster total (8 nodes) |
|---|---|---|
| CPU sockets | 2 | 16 |
| Physical cores | 24 | 192 |
| Threads/core | 2 | — |
| Logical CPUs | 48 | 384 |
| Configured RAM | 64,165 MB (~62.7 GiB) | ~501 GiB |
| GPU | 1× NVIDIA Quadro K2200 | 8 GPUs |
| GPU VRAM | 4 GB | 32 GB aggregate |

Each compute node also exposes a local `/scratch` filesystem, not shared
via NFS. See [Scratch Storage](../storage/scratch.md).
