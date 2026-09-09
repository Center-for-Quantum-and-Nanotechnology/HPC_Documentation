!!! warning "Verification Required"
    Multi-GPU workflows on this cluster have not been validated. Each
    compute node has exactly **one** GPU (see [GPU Nodes](../cluster/gpu-nodes.md)),
    so "multi-GPU" here means multi-node, multi-GPU jobs, not multiple
    GPUs on a single node.

# Multi-GPU

Since each node exposes a single `gpu:quadro:1` resource, using more than
one GPU means requesting more than one node, each with its own GPU:

```bash
#!/bin/bash
#SBATCH --job-name=multi_gpu_job
#SBATCH --partition=week-long-cpu
#SBATCH --nodes=2
#SBATCH --ntasks=2
#SBATCH --gres=gpu:1
#SBATCH --time=01:00:00

module load openmpi
srun --gres=gpu:1 nvidia-smi
```

`week-long-cpu` allows up to 6 nodes per job — see [Partitions](../slurm/partitions.md).

!!! warning "Verification Required"
    `TODO: VERIFY WITH HPC ADMINISTRATOR` — whether framework-level
    distributed training (e.g. PyTorch DDP across nodes) has been tested
    on this cluster, and expected inter-node network bandwidth for GPU
    workloads (see [Network](../cluster/network.md)).
