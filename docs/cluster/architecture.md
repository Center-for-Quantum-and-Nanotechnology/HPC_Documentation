# Architecture

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

The cluster consists of one head/login node and eight GPU-accelerated
compute nodes, connected by an internal cluster network.

```text
                     Users
                       |
                       v
          +-------------------------+
          |     Head / Login Node    |
          |  Scheduler + shared      |
          |  storage + management    |
          +-------------+-------------+
                        |
                  Cluster network
                        |
          +-------------+--------------------------+
          |     8 GPU-accelerated compute nodes     |
          +-------------------------------------------+
```

## Head node

The head/login node runs the Slurm scheduler and provides shared storage
and supporting management/monitoring services for the cluster. It is
**not** a member of the active Slurm compute partitions — see
[Login Node](login-node.md).

## Compute nodes

Slurm schedules all user workloads across the eight compute nodes. See
[Compute Nodes](compute-nodes.md) and [GPU Nodes](gpu-nodes.md) for
resource summaries.

## Shared vs. local storage

`/home` is shared across the head node and all compute nodes. `/scratch`
is local to each individual compute node — see [Storage](../storage/index.md).
