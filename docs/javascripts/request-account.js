(function () {
  "use strict";

  var root = document.getElementById("hpc-account-request");
  if (!root) return;

  var $ = function (id) {
    return document.getElementById(id);
  };

  var fields = {
    name: $("ar-name"),
    email: $("ar-email"),
    isClass: $("ar-is-class"),
    classNumber: $("ar-class-number"),
    department: $("ar-department"),
    modules: $("ar-modules"),
  };

  var roleInputs = Array.prototype.slice.call(
    document.querySelectorAll('input[name="ar-role"]')
  );

  var warningsEl = $("ar-warnings");
  var outputEl = $("ar-output");
  var copyBtn = $("ar-copy");
  var downloadBtn = $("ar-download");

  function selectedRole() {
    var checked = roleInputs.filter(function (el) {
      return el.checked;
    })[0];
    return checked ? checked.value : "Professor";
  }

  function buildRequest() {
    var warnings = [];
    var name = fields.name.value.trim();
    var email = fields.email.value.trim();
    var department = fields.department.value.trim();
    var isClass = fields.isClass.checked;
    var classNumber = fields.classNumber.value.trim();

    if (!name) warnings.push("Enter your full name.");
    if (!email) warnings.push("Enter your email address.");
    if (isClass && !classNumber) {
      warnings.push("This is marked as a class request but no course/section number was entered.");
    }

    var modules = fields.modules.value
      .split("\n")
      .map(function (m) {
        return m.trim();
      })
      .filter(Boolean);

    var lines = [];
    lines.push("Subject: HPC Account Request — " + (name || "<your name>"));
    lines.push("");
    lines.push("Hello,");
    lines.push("");
    lines.push("I would like to request an HPC account with the following details:");
    lines.push("");
    lines.push("Full Name: " + (name || "<your name>"));
    lines.push("Email: " + (email || "<your email>"));
    lines.push("Affiliation: " + selectedRole());
    lines.push("Department: " + (department || "<department>"));

    if (isClass) {
      lines.push("Class-related request: Yes");
      lines.push("Course/Section Number: " + (classNumber || "<course/section number>"));
    } else {
      lines.push("Class-related request: No");
    }

    lines.push("");
    if (modules.length) {
      lines.push("Requested environment modules:");
      modules.forEach(function (m) {
        lines.push("- " + m);
      });
      lines.push("");
    }

    lines.push("Thank you,");
    lines.push(name || "<your name>");

    return { text: lines.join("\n") + "\n", warnings: warnings };
  }

  function render() {
    fields.classNumber.disabled = !fields.isClass.checked;
    if (!fields.isClass.checked) {
      fields.classNumber.value = "";
    }

    var result = buildRequest();
    outputEl.textContent = result.text;

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
    var evt = el.tagName === "TEXTAREA" || el.type === "text" || el.type === "email" ? "input" : "change";
    el.addEventListener(evt, render);
  });

  roleInputs.forEach(function (el) {
    el.addEventListener("change", render);
  });

  function flashButton(button, text) {
    var original = button.textContent;
    button.textContent = text;
    setTimeout(function () {
      button.textContent = original;
    }, 1500);
  }

  function selectOutputText() {
    var range = document.createRange();
    range.selectNodeContents(outputEl);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  copyBtn.addEventListener("click", function () {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      selectOutputText();
      flashButton(copyBtn, "Selected — press Ctrl/Cmd+C");
      return;
    }
    navigator.clipboard.writeText(outputEl.textContent).then(
      function () {
        flashButton(copyBtn, "Copied!");
      },
      function () {
        selectOutputText();
        flashButton(copyBtn, "Selected — press Ctrl/Cmd+C");
      }
    );
  });

  downloadBtn.addEventListener("click", function () {
    var blob = new Blob([outputEl.textContent], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    var name = fields.name.value.trim().replace(/[^a-z0-9_-]+/gi, "-") || "hpc-account-request";
    link.download = name + ".txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  });

  render();
})();
