# Compilers & MPI

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

Multiple compiler and MPI stacks are installed side by side. Compile and
run using a **consistent** module/toolchain combination — mixing, for
example, GCC-built binaries with the Intel MPI runtime, is a common
source of hard-to-diagnose failures.

| Component | Verified value |
|---|---|
| GCC | 14.3.1 |
| Intel oneAPI | Installed (compiler, MKL, MPI, and related modules available) |
| Intel MPI | 2021.17 |
| Open MPI | 4.1.8 |
| Open MPI path | `/usr/local/mpi/intel/openmpi-cuda12.9-4.1.8/bin/mpirun` |

## Open MPI example

```bash
#!/bin/bash
#SBATCH --job-name=mpi_job
#SBATCH --partition=short-cpu
#SBATCH --nodes=1
#SBATCH --ntasks=4
#SBATCH --time=00:10:00

module load openmpi
/usr/local/mpi/intel/openmpi-cuda12.9-4.1.8/bin/mpirun -np $SLURM_NTASKS ./my_mpi_program
```

!!! warning "Verification Required"
    A formal supported-toolchain policy (recommended GCC/Intel/OpenMPI/
    CUDA combinations, and reproducibility expectations) is an open
    documentation item, tracked on HPC staff's internal roadmap. Confirm
    exact module names with `module avail` before scripting against them.

See [MPI Applications](../workflows/mpi.md) for a fuller workflow example.
