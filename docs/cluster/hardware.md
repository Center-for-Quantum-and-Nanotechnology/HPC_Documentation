# Hardware

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

## Head node

| Item | Value |
|---|---|
| Hostname | `head` |
| Operating system | Rocky Linux 10.1 ("Red Quartz") |
| Kernel | `6.12.0-124.40.1.el10_1.x86_64` |
| Architecture | x86-64 |
| Hardware | ASUSTeK Z10PA-U8 Series |
| Firmware | Version 0504, dated 2015-04-09 |
| CPU | Intel Xeon E5-1620 v3 @ 3.50 GHz |
| CPU topology | 1 socket, 4 physical cores, 2 threads/core, 8 logical CPUs |
| Memory | ~15 GiB usable, 31 GiB swap |
| Primary disk | ~9.1 TB |

### Head node storage layout

| Mount | Approx. size | Purpose / status |
|---|---|---|
| `/` | 60 GB | Operating system |
| `/var` | 60 GB | Variable/log data |
| `/tmp` | 30 GB | Temporary local storage |
| `/opt` | 150 GB | Software |
| `/ood` | 30 GB | Open OnDemand-related path — role pending validation |
| `/mcms` | 300 GB | Microway cluster-management resources |
| `/home` | 6 TB | Shared user home storage, exported by NFS |
| `/backup` | 1.8 TB | Backup filesystem — relationship to MCMS backup pending validation |

## Compute nodes (`node2`–`node9`)

| Resource | Per node | Cluster total (8 nodes) |
|---|---|---|
| CPU sockets | 2 | 16 |
| Physical cores | 24 | 192 |
| Threads/core | 2 | — |
| Logical CPUs | 48 | 384 |
| Configured RAM | 64,165 MB (~62.7 GiB) | ~501 GiB |
| GPU | 1× NVIDIA Quadro K2200 | 8 GPUs |
| GPU VRAM | 4 GB | 32 GB aggregate |

Each compute node also exposes a local `/scratch` filesystem, not shared
via NFS. See [Scratch Storage](../storage/scratch.md).
