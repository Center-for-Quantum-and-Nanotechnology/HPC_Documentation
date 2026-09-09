---
title: SCSU HPC
---

# SCSU High Performance Computing

Run simulations. Train models. Process data. This is the documentation
for the Southern Connecticut State University HPC cluster — 8 compute
nodes, GPU acceleration, and Slurm workload scheduling.

!!! warning "Draft documentation"
    This site is generated from a draft SOP (v0.1) and is not yet approved
    for production use. Pages marked **Pending Validation** or carrying a
    "Verification Required" notice have not been confirmed by an HPC
    administrator. See [Terminology](reference/terminology.md) for what
    each validation status means.

## Get started

<div class="hpc-grid" markdown>

<a class="hpc-card" href="getting-started/request-account/">
  <span class="hpc-card__title">Request an account</span>
  <span class="hpc-card__desc">Don't have access yet? Start here</span>
</a>

<a class="hpc-card" href="getting-started/connecting/">
  <span class="hpc-card__title">Connect to the cluster</span>
  <span class="hpc-card__desc">SSH access and PuTTY setup</span>
</a>

<a class="hpc-card" href="getting-started/first-job/">
  <span class="hpc-card__title">Run your first job</span>
  <span class="hpc-card__desc">Submit a Slurm batch workload</span>
</a>

<a class="hpc-card" href="slurm/gpu-jobs/">
  <span class="hpc-card__title">Use a GPU</span>
  <span class="hpc-card__desc">Request and use GPU resources</span>
</a>

<a class="hpc-card" href="storage/data-transfer/">
  <span class="hpc-card__title">Transfer data</span>
  <span class="hpc-card__desc">Move data to and from the cluster</span>
</a>

</div>

## Popular tasks

- [Submit a CPU job](slurm/batch-jobs.md)
- [Submit a GPU job](slurm/gpu-jobs.md)
- [Start an interactive session](slurm/interactive-jobs.md)
- [Load software with environment modules](software/modules.md)
- [Check job status](slurm/monitoring.md)
- [Cancel a job](slurm/cancellation.md)

## The cluster at a glance

| | |
|---|---|
| **Compute nodes** | 8 (`node2`–`node9`), 48 logical CPUs and ~62.7 GiB RAM each |
| **GPUs** | 1× NVIDIA Quadro K2200 per compute node (8 total) |
| **Scheduler** | Slurm 25.11.0, backfill scheduling |
| **Shared storage** | `/home`, NFS-exported, 6 TB |
| **Local scratch** | `/scratch`, per-node, not shared |

See [Cluster Architecture](cluster/architecture.md) for the full picture.

## Need help?

[Troubleshooting](troubleshooting/index.md){ .md-button } [Getting Help](getting-started/getting-help.md){ .md-button }
