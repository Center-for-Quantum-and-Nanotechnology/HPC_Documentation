# FAQ

## Why did Slurm allocate more CPUs than I requested?

Requesting `--cpus-per-task=1` on this cluster's two-threads-per-core
compute nodes can show up as an allocation of 2 logical CPUs — this
reflects whole-core allocation, not an error. See
[Batch Jobs](../slurm/batch-jobs.md).

## Why does `sacct` say accounting is disabled?

Persistent Slurm accounting isn't configured on this cluster yet. Use
`scontrol show job <JOBID>` for jobs the controller still retains
recently. See [Monitoring Jobs](../slurm/monitoring.md) — enabling
persistent accounting is tracked on HPC staff's internal roadmap.

## Can I run my job directly on the login node?

No — `head` is the login/management node, not a compute node. Submit
through Slurm instead. See [Login Node](../cluster/login-node.md).

## Is data on `/scratch` visible from other nodes?

No — `/scratch` is local to each individual compute node. Use `/home`
for anything that needs to be visible across nodes. See
[Scratch Storage](../storage/scratch.md).

!!! warning "Verification Required"
    This FAQ will grow as more questions come in. Have one that isn't
    answered here? See [Getting Help](../getting-started/getting-help.md).
