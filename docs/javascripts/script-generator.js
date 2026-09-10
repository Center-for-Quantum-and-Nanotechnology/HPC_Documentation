(function () {
  "use strict";

  var root = document.getElementById("hpc-script-gen");
  if (!root) return;

  // Keep in sync with config/cluster.yaml and docs/slurm/partitions.md —
  // these are this cluster's verified partition limits, duplicated here
  // because a static client-side tool can't read the YAML source at
  // runtime.
  var PARTITIONS = {
    "short-cpu": { maxHours: 1 },
    "day-long-cpu": { maxHours: 24 },
    "week-long-cpu": { maxHours: 24 * 7, maxNodes: 6 },
    "month-long-cpu": { maxHours: 24 * 31, maxNodes: 4 },
    "interactive-cpu": {
      maxHours: 24 * 2,
      maxNodes: 1,
      maxCpusPerNode: 12,
      maxMemPerNodeMB: 32 * 1024,
    },
  };

  var $ = function (id) {
    return document.getElementById(id);
  };

  var fields = {
    jobName: $("sg-job-name"),
    output: $("sg-output"),
    partition: $("sg-partition"),
    nodes: $("sg-nodes"),
    tasks: $("sg-tasks"),
    cpus: $("sg-cpus"),
    mem: $("sg-mem"),
    memUnit: $("sg-mem-unit"),
    gpus: $("sg-gpus"),
    days: $("sg-days"),
    hours: $("sg-hours"),
    mins: $("sg-mins"),
    secs: $("sg-secs"),
    requeue: $("sg-requeue"),
    nosmt: $("sg-nosmt"),
    email: $("sg-email"),
    mailBegin: $("sg-mail-begin"),
    mailEnd: $("sg-mail-end"),
    mailFail: $("sg-mail-fail"),
    debugHelpers: $("sg-debug-helpers"),
    modules: $("sg-modules"),
    commands: $("sg-commands"),
    scratchStaging: $("sg-scratch-staging"),
  };

  var partitionHint = $("sg-partition-hint");
  var warningsEl = $("sg-warnings");
  var scriptEl = $("sg-script");
  var copyBtn = $("sg-copy");
  var downloadBtn = $("sg-download");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function intVal(el, fallback) {
    var n = parseInt(el.value, 10);
    return isNaN(n) ? fallback : n;
  }

  function partitionLabel(name, p) {
    var bits = [name];
    var limits = [];
    if (p.maxHours % 24 === 0) {
      limits.push(p.maxHours / 24 + (p.maxHours === 24 ? " day" : " days") + " max");
    } else {
      limits.push(p.maxHours + " hours max");
    }
    if (p.maxNodes) limits.push(p.maxNodes + " node" + (p.maxNodes > 1 ? "s" : "") + " max");
    if (p.maxCpusPerNode) limits.push(p.maxCpusPerNode + " CPUs/node max");
    if (p.maxMemPerNodeMB) limits.push(Math.round(p.maxMemPerNodeMB / 1024) + " GB/node max");
    return limits.join(", ");
  }

  function memInMB() {
    var n = intVal(fields.mem, 0);
    return fields.memUnit.value === "G" ? n * 1024 : n;
  }

  function buildScript() {
    var partitionName = fields.partition.value;
    var partition = PARTITIONS[partitionName] || {};
    var warnings = [];

    var days = intVal(fields.days, 0);
    var hours = intVal(fields.hours, 0);
    var mins = intVal(fields.mins, 0);
    var secs = intVal(fields.secs, 0);
    var totalHours = days * 24 + hours + mins / 60 + secs / 3600;

    if (partition.maxHours && totalHours > partition.maxHours) {
      warnings.push(
        "Requested runtime exceeds " + partitionName + "'s limit (" + partitionLabel(partitionName, partition) + ")."
      );
    }

    var nodes = intVal(fields.nodes, 1);
    if (partition.maxNodes && nodes > partition.maxNodes) {
      warnings.push(partitionName + " allows at most " + partition.maxNodes + " node(s) per job — you requested " + nodes + ".");
    }

    var cpus = intVal(fields.cpus, 1);
    if (partition.maxCpusPerNode && cpus > partition.maxCpusPerNode) {
      warnings.push(partitionName + " allows at most " + partition.maxCpusPerNode + " CPUs/node — you requested " + cpus + ".");
    }

    var gpus = intVal(fields.gpus, 0);
    if (gpus > 1) {
      warnings.push("Each compute node has only 1 GPU — " + gpus + " per node isn't available on this cluster.");
    }

    var memMB = memInMB();
    if (partition.maxMemPerNodeMB && memMB * cpus > partition.maxMemPerNodeMB) {
      warnings.push(partitionName + " allows at most ~" + Math.round(partition.maxMemPerNodeMB / 1024) + " GB/node.");
    }

    var lines = ["#!/bin/bash", ""];

    // Collect #SBATCH directives as {text, comment} pairs first, so the
    // trailing "# description" comments can be column-aligned once every
    // line is known — matching the style of the professor's reference
    // script (slurm_scratch.sh) that this generator's comments are based on.
    var sbatch = [];
    function directive(text, comment) {
      sbatch.push({ text: text, comment: comment });
    }

    var jobName = fields.jobName.value.trim();
    if (jobName) directive("#SBATCH --job-name=" + jobName, "Job name (keep it short & descriptive)");

    var output = fields.output.value.trim() || "slurm-%j.out";
    directive("#SBATCH --output=" + output, "Standard output (%j = job ID)");

    directive("#SBATCH --partition=" + partitionName, "Partition/queue — run 'sinfo' to see options");
    directive("#SBATCH --nodes=" + nodes, "Number of nodes");
    directive("#SBATCH --ntasks=" + intVal(fields.tasks, 1), "Total number of tasks");
    directive("#SBATCH --cpus-per-task=" + cpus, "CPUs per task");
    directive("#SBATCH --mem-per-cpu=" + intVal(fields.mem, 512) + fields.memUnit.value, "Memory per CPU");

    if (gpus > 0) {
      directive("#SBATCH --gres=gpu:quadro:" + gpus, "GPUs requested per node");
    }

    directive("#SBATCH --time=" + days + "-" + pad(hours) + ":" + pad(mins) + ":" + pad(secs), "Max runtime (D-HH:MM:SS)");

    if (fields.requeue.checked) directive("#SBATCH --requeue", "Requeue automatically if the node fails");
    if (fields.nosmt.checked) directive("#SBATCH --hint=nomultithread", "Disable hyper-threading");

    var email = fields.email.value.trim();
    var mailTypes = [];
    if (fields.mailBegin.checked) mailTypes.push("BEGIN");
    if (fields.mailEnd.checked) mailTypes.push("END");
    if (fields.mailFail.checked) mailTypes.push("FAIL");
    if (email) {
      directive("#SBATCH --mail-user=" + email, "Email address for job notifications");
      if (mailTypes.length) directive("#SBATCH --mail-type=" + mailTypes.join(","), "Notifications: BEGIN, END, FAIL, REQUEUE, ALL, ...");
    } else if (mailTypes.length) {
      warnings.push("Email event(s) selected, but no email address was entered — add one or the --mail-type flag has nothing to send to.");
    }

    var scratchStaging = fields.scratchStaging.checked;
    if (scratchStaging) {
      directive("#SBATCH --signal=B:TERM@120", "Send TERM 120s before the time limit (lets scratch cleanup finish)");
      if (nodes > 1) {
        warnings.push(
          "Local scratch staging with more than 1 node is best-effort: cleanup is broadcast to every allocated node on a normal exit, timeout, or Ctrl-C, but a hard crash or OOM-kill on a non-batch-host node can still leave that node's /scratch behind. Ask HPC staff about cluster-wide scratch cleanup if you need a guarantee."
        );
      }
    }

    var maxDirectiveLen = sbatch.reduce(function (max, d) {
      return Math.max(max, d.text.length);
    }, 0);
    sbatch.forEach(function (d) {
      lines.push(d.text.padEnd(maxDirectiveLen + 2) + "# " + d.comment);
    });

    lines.push("");

    if (fields.debugHelpers.checked) {
      lines.push("# ###########################################################");
      lines.push("# Optional useful settings / debugging");
      lines.push("# ###########################################################");
      lines.push('# echo "Running on host $(hostname)"');
      lines.push('# echo "Started at $(date)"');
      lines.push('# echo "SLURM_JOB_ID        = $SLURM_JOB_ID"');
      lines.push('# echo "SLURM_JOB_NODELIST  = $SLURM_JOB_NODELIST"');
      lines.push('# echo "SLURM_NTASKS        = $SLURM_NTASKS"');
      lines.push('# echo "SLURM_CPUS_PER_TASK = $SLURM_CPUS_PER_TASK"');
      lines.push("");
      lines.push("# Very useful: print loaded modules (helps when jobs fail mysteriously)");
      lines.push("# module list 2>&1 || true");
      lines.push("");
    }

    var modules = fields.modules.value.split("\n").map(function (m) { return m.trim(); }).filter(Boolean);
    if (modules.length) {
      lines.push("## Load modules");
      modules.forEach(function (m) {
        lines.push("module load " + m);
      });
      lines.push("");
    }

    if (scratchStaging) {
      lines.push("# ###########################################################");
      lines.push("# Local scratch setup");
      lines.push("#  - Assumes all input files needed are in the submit directory.");
      lines.push("#  - Give output files your own program writes a job-ID-qualified");
      lines.push("#    name (e.g. results.$SLURM_JOB_ID.dat) so reruns never collide.");
      lines.push("# ###########################################################");
      lines.push('SUBMIT_DIR="${SLURM_SUBMIT_DIR}"');
      lines.push('LOCAL_SCRATCH_BASE="/scratch"');
      lines.push('LOCAL_USER_DIR="${LOCAL_SCRATCH_BASE}/${USER}"');
      lines.push('LOCAL_JOB_DIR="${LOCAL_USER_DIR}/${SLURM_JOB_ID}"');
      lines.push("");
      lines.push("# Create the job directory on every allocated node");
      lines.push('srun --ntasks="${SLURM_NNODES}" --ntasks-per-node=1 \\');
      lines.push('     mkdir -p "${LOCAL_JOB_DIR}"');
      lines.push("");
      lines.push("# Copy input files from the submit directory to local scratch on");
      lines.push("# every allocated node (excludes Slurm's own log files)");
      lines.push('srun --ntasks="${SLURM_NNODES}" --ntasks-per-node=1 \\');
      lines.push("     rsync -a --exclude='slurm-*.out' --exclude='slurm-*.err' \\");
      lines.push('           "${SUBMIT_DIR}/" "${LOCAL_JOB_DIR}/"');
      lines.push("");
      lines.push('cd "${LOCAL_JOB_DIR}" || { echo "Failed to cd to ${LOCAL_JOB_DIR} on $(hostname)"; exit 1; }');
      lines.push('echo "Working directory on $(hostname): $(pwd)"');
      lines.push("");
      lines.push("cleanup() {");
      lines.push('    echo "Cleanup started at $(date)"');
      lines.push("    # Copy back changed files and remove local scratch on every");
      lines.push("    # allocated node (not just this one) — --ignore-existing won't");
      lines.push("    # overwrite a file already in the submit directory.");
      lines.push('    srun --ntasks="${SLURM_NNODES}" --ntasks-per-node=1 \\');
      lines.push("         bash -c 'rsync -a --ignore-existing \"$0/\" \"$1/\" && rm -rf \"$0\"' \\");
      lines.push('         "${LOCAL_JOB_DIR}" "${SUBMIT_DIR}"');
      lines.push('    rmdir "${LOCAL_USER_DIR}" 2>/dev/null || true');
      lines.push('    echo "Cleanup finished at $(date)"');
      lines.push("}");
      lines.push("# Run cleanup on normal exit, walltime TERM (see --signal above), and Ctrl-C");
      lines.push("trap cleanup EXIT TERM INT");
      lines.push("");
    }

    var commands = fields.commands.value.trim();
    if (commands) {
      lines.push(commands);
    } else {
      lines.push("## Insert your commands here (use 'srun' for anything that should run as a job step).");
    }

    return { text: lines.join("\n") + "\n", warnings: warnings, partition: partition, partitionName: partitionName };
  }

  function render() {
    var result = buildScript();
    scriptEl.textContent = result.text;

    partitionHint.textContent = partitionLabel(result.partitionName, result.partition);

    if (result.warnings.length) {
      warningsEl.innerHTML = "";
      result.warnings.forEach(function (w) {
        var li = document.createElement("li");
        li.textContent = w;
        warningsEl.appendChild(li);
      });
      warningsEl.hidden = false;
    } else {
      warningsEl.hidden = true;
    }
  }

  Object.keys(fields).forEach(function (key) {
    var el = fields[key];
    var evt = el.tagName === "SELECT" || el.type === "checkbox" ? "change" : "input";
    el.addEventListener(evt, render);
  });

  function flashButton(text) {
    var original = copyBtn.textContent;
    copyBtn.textContent = text;
    setTimeout(function () {
      copyBtn.textContent = original;
    }, 1500);
  }

  function selectScriptText() {
    var range = document.createRange();
    range.selectNodeContents(scriptEl);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  copyBtn.addEventListener("click", function () {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      selectScriptText();
      flashButton("Selected — press Ctrl/Cmd+C");
      return;
    }
    navigator.clipboard.writeText(scriptEl.textContent).then(
      function () {
        flashButton("Copied!");
      },
      function () {
        // Clipboard permission denied or unavailable — fall back to a
        // text selection so the user can still copy with Ctrl/Cmd+C.
        selectScriptText();
        flashButton("Selected — press Ctrl/Cmd+C");
      }
    );
  });

  downloadBtn.addEventListener("click", function () {
    var blob = new Blob([scriptEl.textContent], { type: "text/x-shellscript;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    var name = fields.jobName.value.trim().replace(/[^a-z0-9_-]+/gi, "-") || "job";
    link.download = name + ".sh";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  });

  render();
})();
