# Storage Errors

## "No space left on device"

Check usage first:

```bash
du -sh ~
du -sh /scratch/$USER
```

Per-user quotas aren't yet confirmed (see [Quotas](../storage/quotas.md))
— if `/home` or `/scratch` genuinely fills up, remove unneeded files or
contact your HPC administrator.

## Files written by a job aren't where I expect

Remember `/scratch` is **local to each compute node** — if your job ran
on `node5`, files it wrote to `/scratch/$USER` are on `node5` only, not
visible from `head` or any other node. Use `/home` for anything you need
to see afterward. See [Scratch Storage](../storage/scratch.md).

## Permission denied on `/home`

Confirm you're operating inside your own `/home/<USERNAME>` directory —
`whoami` and `pwd` should match (see [First Login](../getting-started/first-login.md)).
If they do and you still get permission errors, contact your HPC
administrator.

!!! warning "Verification Required"
    A catalog of specific NFS/filesystem error messages seen on this
    cluster hasn't been compiled yet.
