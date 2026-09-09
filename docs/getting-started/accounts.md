# Account Setup

HPC accounts are provisioned by an HPC administrator through the Microway
Cluster Management Software (MCMS) — you cannot self-register.

## What you get

| Item | Value |
|---|---|
| Username | Assigned by the HPC administrator, following the institution's account-name convention |
| Home directory | `/home/<USERNAME>` (shared, NFS-exported) |
| Primary group | `hpcusers` (GID 3001) |
| Shell | `/bin/bash` |
| Scratch directory | `/scratch/<USERNAME>` on each compute node (`node2`–`node9`) |

You'll be required to change your temporary password at first login.

!!! info "Requesting an account"
    TODO: VERIFY WITH HPC ADMINISTRATOR — the request process (who to
    contact, what approvals are required, expected turnaround) is not yet
    documented here.

## After your account is created

1. You'll receive your HPC username and SSH connection instructions
   through an approved communication method.
2. Follow [Connecting](connecting.md) to set up SSH access.
3. Follow [First Login](first-login.md) to confirm the account works and
   change your temporary password.

!!! note "For administrators"
    The MCMS account-creation procedure itself lives in HPC staff's
    internal administration documentation, not this public site.
