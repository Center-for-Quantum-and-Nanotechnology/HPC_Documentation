# Architecture

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

The cluster consists of one dedicated head/controller node and eight
scheduled compute nodes.

```text
Users / Administrators
        |
        v
+-------------------------+
|          head           |
|      Rocky Linux 10.1   |
|      Slurm controller   |
|      MCMS / LDAP / NFS  |
|      Prometheus/Grafana |
+-----------+-------------+
            |
      Cluster networks
            |
+-----------+-----------------------------------------------+
| node2 | node3 | node4 | node5 | node6 | node7 | node8 | node9 |
+-----------------------------------------------------------+
  48 logical CPUs, ~64 GB RAM, 1x Quadro K2200 GPU per node
```

## Head node

The head node provides several central services:

- Slurm controller (`slurmctld`)
- NFS shared storage
- LDAP identity services (`slapd`, `nslcd`)
- Monitoring (Prometheus, Grafana)
- Microway Cluster Management Software (MCMS)
- Supporting network services (DNS/DHCP, time sync)

The head node **is not** a member of the active Slurm compute partitions
— see [Login Node](login-node.md).

## Compute nodes

Slurm schedules all user workloads on `node2` through `node9`. See
[Compute Nodes](compute-nodes.md) and [GPU Nodes](gpu-nodes.md) for
specifications.

## Shared vs. local storage

`/home` is shared across the head node and all compute nodes via NFS.
`/scratch` is local to each individual compute node — see
[Storage](../storage/index.md).
