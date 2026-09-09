# Terminology

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

This documentation uses a consistent set of validation-status terms,
inherited from the source SOP, to distinguish what's been directly
confirmed from what's still open:

| Status | Meaning |
|---|---|
| **Observed / Verified** | Directly observed from the running cluster using read-only commands or management-interface inspection. |
| **Operationally Validated** | A normal, low-impact operation was actually performed successfully (for example, a small Slurm job). |
| **Configuration-Verified** | Configuration/state was confirmed, but the associated disruptive procedure was not exercised. |
| **Pending Validation** | Information or procedure remains to be completed during a future discovery session. |

Pages also use a `!!! warning "Verification Required"` admonition for
content that hasn't been confirmed at all, and `TODO: VERIFY WITH HPC
ADMINISTRATOR` inline for specific unknown values — see this project's
`AGENTS.md` for the full content-accuracy rules.
