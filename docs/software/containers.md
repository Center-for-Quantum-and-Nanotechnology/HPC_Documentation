# Containers

!!! warning "Verification Required"
    Container runtime availability (Singularity/Apptainer, Docker, etc.)
    has not been confirmed on this cluster. This page is a placeholder.

## Checking availability

```bash
module avail singularity
module avail apptainer
which singularity apptainer docker 2>/dev/null
```

!!! warning "Verification Required"
    TODO: VERIFY WITH HPC ADMINISTRATOR — which container runtime is
    installed, whether GPU passthrough is supported, image storage
    location/quota, and whether users can build images locally or must
    pull pre-built ones.

See [Containers workflow](../workflows/containers.md) for the intended
end-to-end pattern once this is confirmed.
