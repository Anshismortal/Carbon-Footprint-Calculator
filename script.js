const inventories = {
    Fuel: [
      { name: "Diesel (Boilers)", factor: 2.68 },
      { name: "Furnace Oil", factor: 3.1 },
      { name: "Coal (Bituminous)", factor: 2.42 }
    ],
    Electricity: [
      { name: "Grid Electricity", factor: 0.85 },
      { name: "Diesel Generator", factor: 2.68 }
    ],
    Textile: [
      { name: "Cotton Yarn", factor: 5.0 },
      { name: "Polyester Yarn", factor: 6.5 }
    ],
    Food: [
      { name: "Rice", factor: 1.5 },
      { name: "Wheat", factor: 1.3 }
    ],
    Paper: [
      { name: "Office Paper", factor: 2.0 },
      { name: "Cardboard", factor: 1.8 }
    ]
  };
  
  let selectedInventory = "";
  
  function selectInventory(inventory) {
    selectedInventory = inventory;
    document.getElementById("inventoryTitle").innerText = `${inventory} Inventory`;
    const inputArea = document.getElementById("resourceInputs");
    inputArea.innerHTML = "";
  
    inventories[inventory].forEach((item, index) => {
      const inputHTML = `
        <label>${item.name} (Emission Factor: ${item.factor} kg CO₂/unit)</label>
        <input type="number" id="item-${index}" placeholder="Enter quantity used" min="0" step="any" required>
      `;
      inputArea.innerHTML += inputHTML;
    });
  
    document.getElementById("inventoryForm").style.display = "block";
  }
  
  function submitInventory(event) {
    event.preventDefault();
    let total = 0;
  
    inventories[selectedInventory].forEach((item, index) => {
      const qty = parseFloat(document.getElementById(`item-${index}`).value) || 0;
      total += qty * item.factor;
    });
  
    // Store result in localStorage
    const prev = JSON.parse(localStorage.getItem("emissions")) || {};
    prev[selectedInventory] = parseFloat(total.toFixed(2));
    localStorage.setItem("emissions", JSON.stringify(prev));
  
    alert(`${selectedInventory} Emission Saved: ${total.toFixed(2)} kg CO₂`);
    document.getElementById("inventoryForm").reset();
    document.getElementById("inventoryForm").style.display = "none";
  }
  
  function goToResults() {
    window.location.href = "result.html";
  }
  
  function goBack() {
    window.location.href = "index.html";
  }
  
  // Result Page Logic
  if (window.location.pathname.includes("result.html")) {
    const resultData = JSON.parse(localStorage.getItem("emissions")) || {};
    const resultContainer = document.getElementById("resultContainer");
  
    let html = "<h2>Total Emissions per Inventory:</h2><ul>";
    let grandTotal = 0;
  
    for (let inventory in inventories) {
      const val = resultData[inventory] || 0;
      grandTotal += val;
      html += `<li><strong>${inventory}</strong>: ${val.toFixed(2)} kg CO₂</li>`;
    }
  
    html += `</ul><h3>Gross Total Emission: ${grandTotal.toFixed(2)} kg CO₂</h3>`;
    resultContainer.innerHTML = html;
  }
  