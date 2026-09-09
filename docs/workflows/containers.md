!!! warning "Verification Required"
    See [Software → Containers](../software/containers.md) — container
    runtime availability on this cluster has not been confirmed. This
    workflow page will be filled in once that's verified.

# Containers Workflow

Once a container runtime is confirmed, the intended pattern is to pull or
build an image, then run it inside a Slurm allocation the same way any
other program is run — see [Batch Jobs](../slurm/batch-jobs.md) for the
submission mechanics.
