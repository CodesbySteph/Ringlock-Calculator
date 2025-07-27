
window.onload = function () {
  console.log("Script loaded");

  document.getElementById("calculate").addEventListener("click", function () {
    console.log("Calculate clicked");
    const width = parseInt(document.getElementById("width").value);
    const length = parseInt(document.getElementById("length").value);
    const height = parseInt(document.getElementById("height").value);
    const includeStair = document.getElementById("stairTower").checked;

    const liftsHigh = Math.ceil(height / 6.5);
    const baysWide = Math.ceil(width / 7);
    const baysLong = Math.ceil(length / 7);
    const totalBays = baysWide * baysLong;

    let materials = [];

    materials.push({ name: "Screw Jacks", qty: (baysWide + 1) * (baysLong + 1), weight: 14 * ((baysWide + 1) * (baysLong + 1)) });
    materials.push({ name: "Starter Collars", qty: (baysWide + 1) * (baysLong + 1), weight: 4.18 * ((baysWide + 1) * (baysLong + 1)) });
    materials.push({ name: "Vertical 9'9\"", qty: (baysWide + 1) * (baysLong + 1) * liftsHigh, weight: 33.73 * ((baysWide + 1) * (baysLong + 1) * liftsHigh) });
    materials.push({ name: "Horizontal 7′", qty: baysWide * (baysLong + 1) * liftsHigh, weight: 19.3 * baysWide * (baysLong + 1) * liftsHigh });
    materials.push({ name: "Horizontal 5′2″", qty: baysLong * (baysWide + 1) * liftsHigh, weight: 10.1 * baysLong * (baysWide + 1) * liftsHigh });
    materials.push({ name: "Diagonal Braces", qty: totalBays * liftsHigh, weight: 12 * totalBays * liftsHigh });
    materials.push({ name: "Steel Decks 7′", qty: totalBays, weight: 49.5 * totalBays });
    materials.push({ name: "Top Guardrails", qty: baysWide * 2 + baysLong * 2, weight: 14.2 * (baysWide * 2 + baysLong * 2) });
    materials.push({ name: "Toe Boards", qty: baysWide * 2 + baysLong * 2, weight: 5.5 * (baysWide * 2 + baysLong * 2) });

    
    if (includeStair) {
      const stairLifts = Math.ceil(height / 6.5);
      const stairTowers = 1;

      const stringersPerLift = 2;
      const treadsPerLift = 5;
      const legsPerLift = 4;
      const barsPerLift = 4;
      const diagonalsPerLift = 2;
      const basePlatesPerTower = 4;

      materials.push({ name: "Stair Stringer 7′", qty: stairTowers * stringersPerLift * stairLifts, weight: 42 * stairTowers * stringersPerLift * stairLifts });
      materials.push({ name: "Stair Tread", qty: stairTowers * treadsPerLift * stairLifts, weight: 10 * stairTowers * treadsPerLift * stairLifts });
      materials.push({ name: "Stair Guardrail", qty: stairTowers * barsPerLift * stairLifts, weight: 14 * stairTowers * barsPerLift * stairLifts });
      materials.push({ name: "Stair Standard", qty: stairTowers * legsPerLift * stairLifts, weight: 24 * stairTowers * legsPerLift * stairLifts });
      materials.push({ name: "Stair Ledger", qty: stairTowers * barsPerLift * stairLifts, weight: 16 * stairTowers * barsPerLift * stairLifts });
      materials.push({ name: "Stair Diagonal Brace", qty: stairTowers * diagonalsPerLift * stairLifts, weight: 12 * stairTowers * diagonalsPerLift * stairLifts });
      materials.push({ name: "Stair Base Plate", qty: stairTowers * basePlatesPerTower, weight: 6 * stairTowers * basePlatesPerTower });
    }

    const materialList = document.getElementById("material-list");
    materialList.innerHTML = "<h3>Material List</h3>";

    let totalWeight = 0;

    materials.forEach(item => {
      const itemWeight = (item.weight).toFixed(2);
      totalWeight += parseFloat(itemWeight);
      materialList.innerHTML += `<div>${item.name}: ${item.qty} pcs (${(item.weight / item.qty).toFixed(1)} lbs each) = ${itemWeight} lbs</div>`;
    });

    materialList.innerHTML += `<h3>Total Scaffold Weight: ${totalWeight.toFixed(2)} lbs</h3>`;
  });
};
