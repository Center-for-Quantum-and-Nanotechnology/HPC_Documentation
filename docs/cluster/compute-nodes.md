# Compute Nodes

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

Slurm schedules user workloads across the cluster's eight compute nodes.
The head node is not part of the active compute partitions.

| Resource | Per node | Cluster total |
|---|---|---|
| CPU sockets | 2 | 16 |
| Physical cores | 24 | 192 |
| Logical CPUs (2 threads/core) | 48 | 384 |
| Configured RAM | 64,165 MB (~62.7 GiB) | ~501 GiB |
| GPU | 1× NVIDIA Quadro K2200 | 8 GPUs |

## Local scratch storage

Each compute node exposes a local `/scratch` filesystem. It is **not**
shared through NFS — data written to `/scratch` on one node is not
visible from another. Its retention/cleanup policy is pending validation. See
[Scratch Storage](../storage/scratch.md).

!!! warning
    Multi-node workflows must use shared storage (`/home`) or explicitly
    move data between nodes — don't assume `/scratch` contents are
    available cluster-wide.

## Requesting compute nodes

You don't SSH to compute nodes directly under normal use — Slurm
allocates them for your jobs. See [Slurm Concepts](../slurm/concepts.md)
and [Partitions](../slurm/partitions.md).
