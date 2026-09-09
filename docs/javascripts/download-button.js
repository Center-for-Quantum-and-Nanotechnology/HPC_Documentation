(function () {
  "use strict";

  function initMenu(menu) {
    var toggle = menu.querySelector(".hpc-download-toggle");
    var list = menu.querySelector(".hpc-download-list");
    if (!toggle || !list) return;

    function close() {
      list.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    function open() {
      list.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (toggle.getAttribute("aria-expanded") === "true") {
        close();
      } else {
        open();
      }
    });

    list.addEventListener("click", function (event) {
      var button = event.target.closest("button[data-format]");
      if (!button) return;
      var format = button.getAttribute("data-format");
      if (format === "md") {
        downloadMarkdown(menu);
      } else if (format === "pdf") {
        window.print();
      }
      close();
    });

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target)) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });
  }

  function downloadMarkdown(menu) {
    var dataEl = menu.querySelector("script.hpc-raw-markdown");
    if (!dataEl) return;

    var data;
    try {
      data = JSON.parse(dataEl.textContent);
    } catch (err) {
      console.error("Download button: could not parse page source data", err);
      return;
    }

    var blob = new Blob([data.content], { type: "text/markdown;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = data.filename || "page.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  document.querySelectorAll(".hpc-download-menu").forEach(initMenu);
})();
