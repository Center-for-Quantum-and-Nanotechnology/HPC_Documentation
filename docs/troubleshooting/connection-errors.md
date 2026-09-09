# Connection Errors

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

## PuTTY prompts for the wrong username

1. Close the connection.
2. Load the saved PuTTY session.
3. Open **Connection → Data** and correct **Auto-login username**.
4. Return to **Session** and save the configuration again.

See [Connecting](../getting-started/connecting.md).

## Connection times out or is refused

- Confirm the hostname (`hsc.southernct.edu`) and the approved SSH port
  with your HPC administrator.
- Confirm you're connecting from an allowed network.
- Don't guess alternate ports or addresses.
- If the values are confirmed correct and it still fails, escalate to
  your HPC administrator — see [Getting Help](../getting-started/getting-help.md).

## Authentication fails

- Confirm your HPC username and current password.
- Verify your account exists and provisioning completed — contact your
  HPC administrator if unsure (see [Account Setup](../getting-started/accounts.md)).

## Host-key warning on first connection

Expected on your very first connection to a given host. Verify the
server's fingerprint through an approved source before accepting it —
don't accept blindly, and don't ignore a host-key warning on a
**previously trusted** connection (that can indicate a real problem).
