# Script Generator

<span class="hpc-status hpc-status--verified">Observed / Verified</span>

Build a Slurm batch script for this cluster without memorizing `#SBATCH`
flags. Fill in the fields below — the script on the right updates live —
then copy or download it and fill in your actual commands.

This generates a starting point, not a guarantee: Slurm can still reject
a job for reasons this form doesn't know about (e.g. a partition
temporarily out of resources). See [Batch Jobs](batch-jobs.md) for the
full submission walkthrough and [Partitions](partitions.md) for what
each partition allows.

<div id="hpc-script-gen" class="hpc-script-gen">
  <form class="hpc-script-gen__form" autocomplete="off">

    <fieldset>
      <legend>Basics</legend>

      <label for="sg-job-name">Job name</label>
      <input type="text" id="sg-job-name" placeholder="my_job">
      <p class="hpc-script-gen__hint">Sets <code>--job-name</code> — keep it short &amp; descriptive.</p>

      <label for="sg-output">Output file</label>
      <input type="text" id="sg-output" value="slurm-%j.out">
      <p class="hpc-script-gen__hint">Sets <code>--output</code>. <code>%j</code> in the filename expands to the job ID.</p>

      <label for="sg-partition">Partition</label>
      <select id="sg-partition">
        <option value="short-cpu" selected>short-cpu — default, 1 hour max</option>
        <option value="day-long-cpu">day-long-cpu — 1 day max</option>
        <option value="week-long-cpu">week-long-cpu — 7 days max, 6 nodes max</option>
        <option value="month-long-cpu">month-long-cpu — 31 days max, 4 nodes max</option>
        <option value="interactive-cpu">interactive-cpu — 2 days max, 1 node, 12 CPUs/node, ~32 GB/node</option>
      </select>
      <p class="hpc-script-gen__hint" id="sg-partition-hint"></p>
    </fieldset>

    <fieldset>
      <legend>Resources</legend>

      <label for="sg-nodes">Nodes</label>
      <input type="number" id="sg-nodes" min="1" step="1" value="1">
      <p class="hpc-script-gen__hint">Sets <code>--nodes</code> — number of nodes to allocate.</p>

      <label for="sg-tasks">Tasks</label>
      <input type="number" id="sg-tasks" min="1" step="1" value="1">
      <p class="hpc-script-gen__hint">Sets <code>--ntasks</code> — total number of tasks across all nodes.</p>

      <label for="sg-cpus">CPUs per task</label>
      <input type="number" id="sg-cpus" min="1" step="1" value="1">
      <p class="hpc-script-gen__hint">Sets <code>--cpus-per-task</code>.</p>

      <label for="sg-mem">Memory per CPU</label>
      <span class="hpc-script-gen__inline">
        <input type="number" id="sg-mem" min="1" step="1" value="512">
        <select id="sg-mem-unit">
          <option value="M" selected>MB</option>
          <option value="G">GB</option>
        </select>
      </span>
      <p class="hpc-script-gen__hint">Sets <code>--mem-per-cpu</code>.</p>

      <label for="sg-gpus">GPUs per node</label>
      <input type="number" id="sg-gpus" min="0" step="1" value="0">
      <p class="hpc-script-gen__hint">Each compute node has one GPU (<code>gpu:quadro:1</code>) — see <a href="../../cluster/gpu-nodes/">GPU Nodes</a>.</p>
    </fieldset>

    <fieldset>
      <legend>Time &amp; scheduling</legend>

      <label>Max runtime</label>
      <span class="hpc-script-gen__inline hpc-script-gen__time">
        <input type="number" id="sg-days" min="0" step="1" value="0" aria-label="Days"><span>d</span>
        <input type="number" id="sg-hours" min="0" max="23" step="1" value="1" aria-label="Hours"><span>h</span>
        <input type="number" id="sg-mins" min="0" max="59" step="1" value="0" aria-label="Minutes"><span>m</span>
        <input type="number" id="sg-secs" min="0" max="59" step="1" value="0" aria-label="Seconds"><span>s</span>
      </span>
      <p class="hpc-script-gen__hint">Sets <code>--time</code> (format: D-HH:MM:SS).</p>

      <span class="hpc-script-gen__checkbox">
        <input type="checkbox" id="sg-requeue">
        <label for="sg-requeue">Requeue automatically if the node fails</label>
      </span>

      <span class="hpc-script-gen__checkbox">
        <input type="checkbox" id="sg-nosmt">
        <label for="sg-nosmt">Disable hyper-threading (<code>--hint=nomultithread</code>)</label>
      </span>
    </fieldset>

    <fieldset>
      <legend>Email notifications</legend>

      <label for="sg-email">Email address</label>
      <input type="email" id="sg-email" placeholder="you@southernct.edu">
      <p class="hpc-script-gen__hint">Sets <code>--mail-user</code>.</p>

      <span class="hpc-script-gen__checkbox">
        <input type="checkbox" id="sg-mail-begin"><label for="sg-mail-begin">Job starts</label>
      </span>
      <span class="hpc-script-gen__checkbox">
        <input type="checkbox" id="sg-mail-end"><label for="sg-mail-end">Job ends</label>
      </span>
      <span class="hpc-script-gen__checkbox">
        <input type="checkbox" id="sg-mail-fail"><label for="sg-mail-fail">Job fails</label>
      </span>
      <p class="hpc-script-gen__hint">Sets <code>--mail-type</code>.</p>
    </fieldset>

    <fieldset>
      <legend>Environment &amp; commands</legend>

      <span class="hpc-script-gen__checkbox">
        <input type="checkbox" id="sg-debug-helpers" checked>
        <label for="sg-debug-helpers">Include optional debugging helpers <span class="hpc-script-gen__optional">(commented out — job/host info, loaded modules)</span></label>
      </span>

      <label for="sg-modules">Modules to load <span class="hpc-script-gen__optional">(one per line)</span></label>
      <textarea id="sg-modules" rows="2" placeholder="python/3.12&#10;openmpi"></textarea>

      <label for="sg-commands">Commands to run</label>
      <textarea id="sg-commands" rows="4" placeholder="srun ./my_program"></textarea>
    </fieldset>

    <fieldset>
      <legend>Local scratch staging <span class="hpc-script-gen__optional">(optional)</span></legend>

      <span class="hpc-script-gen__checkbox">
        <input type="checkbox" id="sg-scratch-staging" checked>
        <label for="sg-scratch-staging">Stage to local <code>/scratch</code>, copy results back on exit</label>
      </span>
      <p class="hpc-script-gen__hint">
        Copies everything from your submit directory to local <code>/scratch</code>
        on each allocated node, runs there, then copies changed files back
        and cleans up automatically — on normal exit, a timeout, or
        Ctrl-C. Assumes your input files are already in the directory you
        submit from. Give any output file your own program writes a
        job-ID-qualified name (e.g. <code>results.$SLURM_JOB_ID.dat</code>)
        so reruns never collide during copy-back.
      </p>
    </fieldset>

  </form>

  <div class="hpc-script-gen__output">
    <div class="hpc-script-gen__output-header">
      <span>sbatch script</span>
      <span class="hpc-script-gen__actions">
        <button type="button" id="sg-copy">Copy</button>
        <button type="button" id="sg-download">Download .sh</button>
      </span>
    </div>
    <ul class="hpc-script-gen__warnings" id="sg-warnings" hidden></ul>
    <pre class="hpc-script-gen__pre"><code id="sg-script" class="language-bash"></code></pre>
  </div>
</div>

<noscript>
  <p>This tool needs JavaScript enabled to generate a script. In the
  meantime, see <a href="batch-jobs.md">Batch Jobs</a> for a manually
  written example.</p>
</noscript>

## Next

- [Batch Jobs](batch-jobs.md) — submit the script you just built with `sbatch`
- [GPU Jobs](gpu-jobs.md) — more on requesting GPUs
- [Partitions](partitions.md) — full limits for every partition
