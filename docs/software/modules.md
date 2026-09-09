# Environment Modules

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

Software is managed with [Lmod](https://lmod.readthedocs.io/) (version
8.7.65). Load only the software you need for a given job — don't load
everything by default, since conflicting compiler/MPI stacks can break a
build.

## Common commands

```bash
module avail          # list everything available
module list            # list what's currently loaded
module load <name>     # load a module
module unload <name>   # unload a module
module purge           # unload everything
module spider <name>   # search for a module by name
```

## Using modules in a batch script

```bash
#!/bin/bash
#SBATCH --job-name=with_modules
#SBATCH --partition=short-cpu
#SBATCH --time=00:10:00

module purge
module load python/3.12
python my_script.py
```

!!! tip
    Put `module purge` before loading what you need in a batch script —
    don't rely on whatever happens to be loaded in your interactive
    shell, since that can differ between login sessions.

## Available toolchains

See [Compilers & MPI](compilers.md), [Python](python.md), and
[CUDA](cuda.md) for the specific versions installed.
