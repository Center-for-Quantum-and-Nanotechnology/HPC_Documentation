# MPI Applications

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

Open MPI 4.1.8 is installed at
`/usr/local/mpi/intel/openmpi-cuda12.9-4.1.8/bin/mpirun`, and Intel MPI
2021.17 is available as an alternative — see [Compilers & MPI](../software/compilers.md).
Pick one stack per project and stay consistent; mixing compiler/MPI
stacks between build and run is a common source of failures.

## Multi-node batch example

```bash
#!/bin/bash
#SBATCH --job-name=mpi_job
#SBATCH --partition=week-long-cpu
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=24
#SBATCH --time=01:00:00

module load openmpi
/usr/local/mpi/intel/openmpi-cuda12.9-4.1.8/bin/mpirun -np $SLURM_NTASKS ./my_mpi_program
```

`week-long-cpu` allows up to 6 nodes per job — see [Partitions](../slurm/partitions.md)
for every partition's node limits.

!!! warning "Verification Required"
    Whether Slurm's PMI/PMIx integration is configured (allowing
    `srun ./my_mpi_program` directly, without `mpirun`) has not been
    confirmed on this cluster — use `mpirun` as shown above unless your
    HPC administrator confirms otherwise.
