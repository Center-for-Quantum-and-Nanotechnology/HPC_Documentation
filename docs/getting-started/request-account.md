# Request an Account

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

Fill in the fields below to build a ready-to-send account request — the
text on the right updates live. Copy it into an email to HPC staff (see
[Getting Help](getting-help.md) for the address) or download it as a
`.txt` file.

This doesn't submit anything on its own — it just formats the request.
Accounts are still provisioned manually; see [Account Setup](accounts.md)
for what happens after you send it.

<div id="hpc-account-request" class="hpc-script-gen">
  <form class="hpc-script-gen__form" autocomplete="off">

    <fieldset>
      <legend>Requester</legend>

      <label for="ar-name">Full name</label>
      <input type="text" id="ar-name" placeholder="Jane Doe">

      <label for="ar-email">Email address</label>
      <input type="email" id="ar-email" placeholder="you@southernct.edu">

      <label>Affiliation</label>
      <div class="hpc-toggle-group" role="radiogroup" aria-label="Affiliation">
        <input type="radio" id="ar-role-professor" name="ar-role" value="Professor" checked>
        <label for="ar-role-professor">Professor</label>

        <input type="radio" id="ar-role-student" name="ar-role" value="Student">
        <label for="ar-role-student">Student</label>

        <input type="radio" id="ar-role-unaffiliated" name="ar-role" value="Unaffiliated">
        <label for="ar-role-unaffiliated">Unaffiliated</label>
      </div>
    </fieldset>

    <fieldset>
      <legend>Course &amp; department</legend>

      <span class="hpc-script-gen__checkbox">
        <input type="checkbox" id="ar-is-class">
        <label for="ar-is-class">This request is for a class</label>
      </span>

      <label for="ar-class-number">Course / section number <span class="hpc-script-gen__optional">(if applicable)</span></label>
      <input type="text" id="ar-class-number" placeholder="CSC 550-01" disabled>

      <label for="ar-department">Department</label>
      <input type="text" id="ar-department" placeholder="Computer Science">
    </fieldset>

    <fieldset>
      <legend>Environment modules</legend>

      <label for="ar-modules">Modules needed <span class="hpc-script-gen__optional">(one per line, if known)</span></label>
      <textarea id="ar-modules" rows="3" placeholder="python/3.12&#10;cuda"></textarea>
    </fieldset>

  </form>

  <div class="hpc-script-gen__output">
    <div class="hpc-script-gen__output-header">
      <span>Account request</span>
      <span class="hpc-script-gen__actions">
        <button type="button" id="ar-copy">Copy</button>
        <button type="button" id="ar-download">Download .txt</button>
      </span>
    </div>
    <ul class="hpc-script-gen__warnings" id="ar-warnings" hidden></ul>
    <pre class="hpc-script-gen__pre"><code id="ar-output" class="language-text"></code></pre>
  </div>
</div>

<noscript>
  <p>This tool needs JavaScript enabled to build the request text. In the
  meantime, see <a href="accounts.md">Account Setup</a> for what
  information to include.</p>
</noscript>

## Next

- [Account Setup](accounts.md) — what happens after your request is sent
- [Connecting](connecting.md) — set up SSH once your account exists
- [Getting Help](getting-help.md) — where to send the request
