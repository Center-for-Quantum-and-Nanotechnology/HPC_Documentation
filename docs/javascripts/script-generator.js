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
    modules: $("sg-modules"),
    commands: $("sg-commands"),
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

    var jobName = fields.jobName.value.trim();
    if (jobName) lines.push("#SBATCH --job-name=" + jobName);

    var output = fields.output.value.trim() || "slurm-%j.out";
    lines.push("#SBATCH --output=" + output);

    lines.push("#SBATCH --partition=" + partitionName);
    lines.push("#SBATCH --nodes=" + nodes);
    lines.push("#SBATCH --ntasks=" + intVal(fields.tasks, 1));
    lines.push("#SBATCH --cpus-per-task=" + cpus);
    lines.push("#SBATCH --mem-per-cpu=" + intVal(fields.mem, 512) + fields.memUnit.value);

    if (gpus > 0) {
      lines.push("#SBATCH --gres=gpu:quadro:" + gpus);
    }

    lines.push("#SBATCH --time=" + days + "-" + pad(hours) + ":" + pad(mins) + ":" + pad(secs));

    if (fields.requeue.checked) lines.push("#SBATCH --requeue");
    if (fields.nosmt.checked) lines.push("#SBATCH --hint=nomultithread");

    var email = fields.email.value.trim();
    var mailTypes = [];
    if (fields.mailBegin.checked) mailTypes.push("BEGIN");
    if (fields.mailEnd.checked) mailTypes.push("END");
    if (fields.mailFail.checked) mailTypes.push("FAIL");
    if (email) {
      lines.push("#SBATCH --mail-user=" + email);
      if (mailTypes.length) lines.push("#SBATCH --mail-type=" + mailTypes.join(","));
    } else if (mailTypes.length) {
      warnings.push("Email event(s) selected, but no email address was entered — add one or the --mail-type flag has nothing to send to.");
    }

    lines.push("");

    var modules = fields.modules.value.split("\n").map(function (m) { return m.trim(); }).filter(Boolean);
    if (modules.length) {
      lines.push("## Load modules");
      modules.forEach(function (m) {
        lines.push("module load " + m);
      });
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
