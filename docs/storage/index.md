# Storage

| Location | Shared? | Use for |
|---|---|---|
| [`/home`](home.md) | Yes, NFS across all nodes | Scripts, source, datasets, results |
| [`/scratch`](scratch.md) | No, local per compute node | Temporary job-local I/O |
| [Project Storage](project-storage.md) | Pending | Larger/longer-lived shared datasets |

See [Quotas](quotas.md) for space limits and [Data Transfer](data-transfer.md)
for moving data to and from the cluster.

!!! warning
    Don't assume data written to `/scratch` on one compute node is
    visible from another — it isn't. Multi-node workflows must use
    `/home` or explicitly move data between nodes.
