# Out of Memory

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

## Default memory request

If your batch script doesn't request memory explicitly, Slurm defaults to
**512 MB per CPU** on this cluster (see [Concepts](../slurm/concepts.md)).
A single-CPU job with no `--mem` request only gets 512 MB — often not
enough for real workloads.

## Requesting more memory

```bash
#SBATCH --mem=8G
```

or per-CPU:

```bash
#SBATCH --mem-per-cpu=2G
```

Stay within your chosen partition's per-node memory ceiling (e.g.
`interactive-cpu` caps at ~32 GB/node — see [Partitions](../slurm/partitions.md)).
Compute nodes have ~62.7 GiB total (see [Compute Nodes](../cluster/compute-nodes.md)),
so requesting close to that on a shared node may also increase how long
you wait in the queue.

## Confirming an OOM kill

```bash
scontrol show job <JOBID>
```

Look for a non-zero exit code and check your output file for an
`Out of Memory` or `oom-kill` message from the kernel.

See [Jobs Failing](jobs-failing.md) for other failure causes.
