# Network

<span class="hpc-status hpc-status--pending">Configuration-Verified</span>

## Observed network segments

| Address space | Observed / apparent role |
|---|---|
| `10.1.0.0/24` | Internal cluster/compute network |
| `10.0.0.0/23` | Management network |
| `10.0.1.x` | IPMI / out-of-band management addressing |
| `192.168.1.0/24` | Upstream/external-facing network observed on `head` |

!!! warning "Verification Required"
    Exact switch topology, redundancy, and interface mapping are pending
    validation. Do not treat this table as a complete network diagram.

## NFS exports

The head node exports the following paths to compute nodes over
NFSv4.2:

- `/home` — shared persistent user home directories
- `/mcms` — shared Microway cluster-management resources
- `/opt/intel` — shared Intel software tree

A Slurm allocation on `node2` confirmed `/home` is visible with the same
user identity and path as on `head`. Compute-node `/scratch` is local and
is not part of these exports — see [Scratch Storage](../storage/scratch.md).

!!! warning "NFS export security"
    The current NFS export options (`rw,no_root_squash,async,no_subtree_check`)
    have not been reviewed against university security requirements,
    particularly `no_root_squash` and `async`. This is tracked on HPC
    staff's internal roadmap.
