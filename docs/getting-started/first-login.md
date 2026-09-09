# First Login

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

After connecting (see [Connecting](connecting.md)), confirm your login
landed in the right place before doing anything else.

## Confirm your identity and location

Run:

```bash
whoami
```

Then:

```bash
pwd
```

Expected pattern:

```text
<USERNAME>
/home/<USERNAME>
```

Optionally, check your group membership:

```bash
id
```

Your primary group should resolve to `hpcusers`.

## Troubleshooting

If PuTTY prompted for the wrong username, close the connection, reload
the saved session, correct **Auto-login username** under
**Connection → Data**, and save the session again.

If the connection times out or is refused:

- Confirm the hostname and port with your HPC administrator.
- Confirm you're connecting from an allowed network.
- Don't guess alternate ports or addresses.

If authentication fails, confirm your username and current password, and
verify with your HPC administrator that account provisioning completed.

See [Connection Errors](../troubleshooting/connection-errors.md) for more.

Next: [Your First Job](first-job.md).
