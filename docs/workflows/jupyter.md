!!! warning "Verification Required"
    Jupyter availability on this cluster (via Open OnDemand, a module, or
    manual port-forwarding) has not been confirmed. This page is a
    placeholder.

# Jupyter

The head node has an `/ood` path that appears related to
[Open OnDemand](https://openondemand.org/), which typically provides a
browser-based Jupyter interface — but its role and configuration are
`TODO: VERIFY WITH HPC ADMINISTRATOR` (see [Hardware](../cluster/hardware.md)).

## Manual fallback (SSH port-forwarding)

Until Open OnDemand access is confirmed, a Jupyter session can typically
be run inside a Slurm interactive allocation and reached via SSH
port-forwarding:

```bash
srun --partition=interactive-cpu --nodes=1 --cpus-per-task=4 --pty bash
module load conda
conda activate myenv
jupyter notebook --no-browser --port=8888
```

Then, from your local machine, forward the port through the login node:

```bash
ssh -L 8888:<COMPUTE_NODE>:8888 -p <SSH_PORT> <USERNAME>@hsc.southernct.edu
```

!!! warning "Verification Required"
    This manual pattern has not been tested on this cluster and depends
    on confirming SSH access to individual compute nodes, which is
    `TODO: VERIFY WITH HPC ADMINISTRATOR`.
