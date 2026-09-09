# Login Node

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

When you SSH to `hsc.southernct.edu` (see [Connecting](../getting-started/connecting.md)),
you land on `head` — the cluster's single head/login node.

## What runs here

`head` provides the Slurm controller, shared NFS storage, LDAP identity
services, MCMS, and monitoring. It is **not** a member of the active
Slurm compute partitions — your batch and interactive jobs always run on
`node2`–`node9`, not on `head` itself.

!!! danger "Don't run workloads on the login node"
    Compile code, edit files, and submit jobs from `head`, but run actual
    computation through Slurm (`sbatch`/`srun`/`salloc`). Running
    computationally intensive work directly on the login node affects
    every other user connected to it.

See [Hardware](hardware.md) for `head`'s specifications and
[Architecture](architecture.md) for how it relates to the compute nodes.
