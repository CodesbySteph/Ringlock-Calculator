
window.addEventListener("load", function () {
  const observer = new MutationObserver(() => {
    const list = document.getElementById("material-list");
    if (list && list.innerText.includes("pcs")) {
      if (document.getElementById("addon-output")) return;

      let totalPieces = 0;
      let totalWeight = 0;

      const lines = list.querySelectorAll("p");
      lines.forEach(p => {
        const text = p.textContent;

        if (text.includes("pcs") && text.includes("lbs")) {
          const parts = text.split(" ");
          const pcsIndex = parts.findIndex(word => word === "pcs");
          const lbsIndex = parts.findIndex(word => word === "lbs");

          if (pcsIndex > 0 && lbsIndex > 2) {
            const qty = parseInt(parts[pcsIndex - 1]);
            const weight = parseFloat(parts[lbsIndex - 1]);

            if (!isNaN(qty)) totalPieces += qty;
            if (!isNaN(weight)) totalWeight += weight;
          }
        }
      });

      const addonDiv = document.createElement("div");
      addonDiv.id = "addon-output";
      addonDiv.style.marginTop = "20px";

      const manhours = ((totalPieces * 18) / 60).toFixed(2);
      const manhourLine = document.createElement("p");
      manhourLine.innerHTML = "<strong>Estimated Manhours:</strong> " + manhours + " hrs";
      addonDiv.appendChild(manhourLine);

      if (totalWeight > 48000) {
        const warning = document.createElement("p");
        warning.style.color = "red";
        warning.style.fontWeight = "bold";
        warning.textContent = "⚠ Total exceeds typical truckload capacity (48,000 lbs)";
        addonDiv.appendChild(warning);
      }

      const printButton = document.createElement("button");
      printButton.textContent = "Print / Save";
      printButton.style.marginTop = "15px";
      printButton.style.backgroundColor = "#333";
      printButton.style.color = "white";
      printButton.style.border = "none";
      printButton.style.padding = "10px 15px";
      printButton.style.borderRadius = "4px";
      printButton.onclick = () => window.print();
      addonDiv.appendChild(printButton);

      list.appendChild(addonDiv);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
