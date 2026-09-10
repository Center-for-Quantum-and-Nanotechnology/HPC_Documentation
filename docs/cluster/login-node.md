# Login Node

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

When you connect over SSH (see [Connecting](../getting-started/connecting.md)),
you land on the cluster's single head/login node.

## What runs here

The head/login node runs the Slurm scheduler and provides shared storage
and supporting management/monitoring services for the cluster. It is
**not** a member of the active Slurm compute partitions — your batch and
interactive jobs always run on the compute nodes, not on the login node
itself.

!!! danger "Don't run workloads on the login node"
    Compile code, edit files, and submit jobs from the login node, but
    run actual computation through Slurm (`sbatch`/`srun`/`salloc`).
    Running computationally intensive work directly on the login node
    affects every other user connected to it.

See [Hardware](hardware.md) for a resource summary and
[Architecture](architecture.md) for how it relates to the compute nodes.
