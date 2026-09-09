!!! warning "Verification Required"
    Machine-learning framework availability (PyTorch, TensorFlow, etc.),
    recommended install method (Conda vs. modules vs. containers), and
    any pre-built environments have not been confirmed. This page is a
    placeholder.

# Machine Learning

## What's confirmed today

- GPU access via Slurm's `gpu:quadro:1` resource — see [GPU Jobs](../slurm/gpu-jobs.md).
- CUDA 12.9 toolkit installed — see [CUDA](../software/cuda.md).
- Conda available as a module — see [Python](../software/python.md).

## What's not yet confirmed

`TODO: VERIFY WITH HPC ADMINISTRATOR`:

- Whether framework packages (PyTorch/TensorFlow/JAX) are pre-installed
  or must be installed per-user via Conda/pip.
- Multi-GPU training support beyond the single GPU per node available
  today — see [Multi-GPU](multi-gpu.md).
- Any shared model/dataset cache location.

## Minimal example (once a framework is confirmed available)

```bash
#!/bin/bash
#SBATCH --job-name=ml_job
#SBATCH --partition=short-cpu
#SBATCH --gres=gpu:1
#SBATCH --time=00:30:00

module load conda
conda activate myenv
python train.py
```
