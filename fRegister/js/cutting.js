const database = {
    planner: "Заграй Володимир Владиславович",
    estimatedQuantity: "14 500",
    rollName: "C-896-----170TH550F2828-BAO",
    product: "0,17×896×795 BAO BLANK",
    actualQuantity: "14 500",
    cuttingFormat1C: "0,17x896x795 2,8/2,8 TH550",
    rollCode1C: "UA0006307",
    cuttingFormat: "T-896-795-170TH550F2828-BAO BLANK",
    cuttingCode1C: "UA0006943"
};

// Function to populate the fields with data from the "database"
function populateFields() {
    document.getElementById('planner').value = database.planner;
    document.getElementById('estimated-quantity').value = database.estimatedQuantity;
    document.getElementById('roll-name').value = database.rollName;
    document.getElementById('product').value = database.product;
    document.getElementById('actual-quantity').value = database.actualQuantity;
    document.getElementById('cutting-format-1c').value = database.cuttingFormat1C;
    document.getElementById('roll-code-1c').value = database.rollCode1C;
    document.getElementById('cutting-format').value = database.cuttingFormat;
    document.getElementById('cutting-code-1c').value = database.cuttingCode1C;
}

// Call the function to populate the fields when the page loads
window.onload = populateFields;

function addRollInfo() {
    const rollInfoTemplate = `
        <div class="roll-info">
            <div class="roll-header">
                <div>№ Рулона</div>
                <div>14289330303</div>
            </div>
            <div class="roll-details">
                <div>Кількість в пачці: 7 000</div>
                <div>Вага: 135</div>
                <div>К-сть повних пачок: 10</div>
                <div>Виробник: BestMadeMetals Inc.</div>
                <div>Кількість в останніх: 6 800</div>
                <div>Довжина: 200</div>
                <div>Твердість: 1800</div>
                <div>Оператор: Демков Іван Владиславович</div>
                <div>15.11.2024</div>
            </div>
        </div>
    `;
    const rollsContainer = document.getElementById('rolls-container');
    rollsContainer.insertAdjacentHTML('beforeend', rollInfoTemplate);
}