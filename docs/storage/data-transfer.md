# Data Transfer

Move data between your computer and the cluster over SSH/SCP to the same
host you use to log in.

## From a Windows machine

Use a graphical SFTP client such as [WinSCP](../software/winscp.md), or
PuTTY's `pscp` command-line tool, pointed at the same host and
credentials as your interactive session (see
[Connecting](../getting-started/connecting.md)). See
[Software → WinSCP](../software/winscp.md) for the full configuration
and upload/download walkthrough.

## From macOS/Linux

```bash
scp -P <SSH_PORT> localfile.txt <USERNAME>@hsc.southernct.edu:/home/<USERNAME>/
scp -P <SSH_PORT> -r localdir/ <USERNAME>@hsc.southernct.edu:/home/<USERNAME>/
rsync -avz -e "ssh -p <SSH_PORT>" localdir/ <USERNAME>@hsc.southernct.edu:/home/<USERNAME>/
```

Replace `<SSH_PORT>` with the value your HPC administrator provided —
it's intentionally not published in this document (see
[Connecting](../getting-started/connecting.md)).

!!! warning
    Transfer data to `/home`, not `/scratch` — `/scratch` is local to
    individual compute nodes and isn't a sensible transfer target. See
    [Storage](index.md).

!!! warning "Verification Required"
    Whether a dedicated high-throughput data-transfer node/endpoint
    exists (separate from the interactive login host) is `TODO: VERIFY
    WITH HPC ADMINISTRATOR`.
