# Software

This section covers two different things: client software you install on
your own workstation to reach the cluster, and software installed on the
cluster itself.

## Client tools

- [PuTTY](putty.md) — SSH terminal client for Windows
- [WinSCP](winscp.md) — graphical SFTP client for Windows

## Cluster software

Software on the cluster is managed through environment modules (Lmod).
Multiple compiler and MPI stacks are available side by side — pick one
combination and stay consistent within a project.

- [Environment Modules](modules.md) — Lmod basics
- [Python](python.md)
- [R](r.md)
- [CUDA](cuda.md)
- [Compilers & MPI](compilers.md)
- [Containers](containers.md)

!!! warning "Verification Required"
    A formal supported-toolchain policy (which GCC/Intel/OpenMPI/CUDA
    combinations are recommended together) is an open documentation item,
    tracked on HPC staff's internal roadmap.
