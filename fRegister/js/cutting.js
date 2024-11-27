// Simulated database data
const database = {
    planner: "Заграй Володимир Владиславович",
    estimatedQuantity: "14 500",
    rollName: "C-896-----170TH550F2828-BAO",
    product: "0,17×896×795 BAO BLANK",
    actualQuantity: "14 500",
    cuttingFormat1C: "0,17x896x795 2,8/2,8 TH550",
    rollCode1C: "UA0006307",
    cuttingFormat: "T-896-795-170TH550F2828-BAO BLANK",
    cuttingCode1C: "UA0006943",
    operators: [
        "Демков Іван Владиславович",
        "Іванов Петро Петрович",
        "Сидоров Олексій Олексійович"
    ]
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

    const operatorSelect = document.getElementById('operator');
    database.operators.forEach(operator => {
        const option = document.createElement('option');
        option.value = operator;
        option.textContent = operator;
        operatorSelect.appendChild(option);
    });
}

// Call the function to populate the fields when the page loads
window.onload = populateFields;

function toggleMoreInfo() {
    const moreInfo = document.getElementById('more-info');
    if (moreInfo.style.display === 'none' || moreInfo.style.display === '') {
        moreInfo.style.display = 'flex';
    } else {
        moreInfo.style.display = 'none';
    }
}

function addRollInfo() {
    const rollInfoTemplate = `
        <div class="roll-info">
            <div class="roll-header">
                <div>№ Рулона</div>
                <div>14289330303</div>
            </div>
            <div class="roll-details">
                <div>
                    <label>Кількість в пачці</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Вага</label>
                    <input type="text" value="135" readonly />
                </div>
                <div>
                    <label>К-сть повних пачок</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Виробник</label>
                    <input type="text" value="BestMadeMetals Inc." readonly />
                </div>
                <div>
                    <label>Кількість в останніх</label>
                    <input type="number" />
                </div>
                <div>
                    <label>Довжина</label>
                    <input type="text" value="200" readonly />
                </div>
                <div>
                    <label>Твердість</label>
                    <input type="text" value="1800" readonly />
                </div>
                <div>
                    <label>Оператор</label>
                    <select>
                        ${database.operators.map(operator => `<option value="${operator}">${operator}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label>Дата</label>
                    <input type="text" value="15.11.2024" readonly />
                </div>
            </div>
        </div>
    `;
    const rollsContainer = document.getElementById('rolls-container');
    rollsContainer.insertAdjacentHTML('beforeend', rollInfoTemplate);
}