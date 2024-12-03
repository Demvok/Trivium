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

let rollIndex = 0;

let packsCount = [0]


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
    document.getElementsByClassName('pack-count')[0].innerText = packsCount[0]

    // const operatorSelect = document.getElementById('operator');
    // database.operators.forEach(operator => {
    //     const option = document.createElement('option');
    //     option.value = operator;
    //     option.textContent = operator;
    //     operatorSelect.appendChild(option);
    // });
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
    rollIndex++;
    packsCount.push(0)
    const newRollInfoTemplate = `<div class="roll-container">
            <div class="roll-number">
                <label class="roll-number label">№ Рулона</label>
<<<<<<< HEAD
                <div class="roll-number dropdown active">
=======
                <div class="roll-number dropdown">
>>>>>>> 3b015a009fe0ff1676244125a0772e7199b12b6d
                    <button class="dropbtn">Обрати рулон <i class="fa fa-caret-down"></i></button>
                    <div class="roll dropdown-content">
                        <a href="#">Option 1</a>
                        <a href="#">Option 2</a>
                        <a href="#">Option 3</a>
                    </div>
                </div>
            </div>
            <button class="create-button button-green" data-index="${rollIndex}" onclick="crteatePack(this)">Створити пачку</button>



            



<<<<<<< HEAD
            <div class="print-label dropdown active">
=======
            <div class="print-label dropdown">
>>>>>>> 3b015a009fe0ff1676244125a0772e7199b12b6d
                <button class="dropbtn">Надрукувати етикетку <i class="fa fa-caret-down"></i></button>
                <div class="print dropdown-content">
                    <a href="#">Пачка 1</a>
                    <a href="#">Пачка 2</a>
                    <a href="#">Пачка 3</a>
                    <a href="#">Пачка 4</a>
                    <a href="#">Пачка 5</a>
                    <a href="#">Пачка 6</a>
                </div>
            </div>
            <button class="close-roll-button button-orange" onclick="closeRoll(this)">Закрити рулон</button>
            <div class="info">
                <div class="info-label">К-сть створених пачок</div>
                <div class="pack-count"></div>
            </div>
            </div>
        `;
    const rollsContainer = document.getElementById('rolls-container');
    rollsContainer.insertAdjacentHTML('beforeend', newRollInfoTemplate);
}




//________________________________________________________________________________________________________________________________




        // document.getElementById('rollNumberBtn').addEventListener('click', function() {
        //     alert('№ Рулона button clicked');
        // });

function crteatePack(btn){
    console.log(btn);
    
    index = btn.getAttribute("data-index");
    
    packsCount[index]++;
    document.getElementsByClassName('pack-count')[index].innerText = packsCount[index];
    document.getElementById("myModal").style.display = "block";
}



function closeModal() {
    document.getElementById("myModal").style.display = "none";
}



function closeRoll(element){
    const block = element.closest('.roll-container'); // Знаходимо батьківський блок
    const buttons = block.querySelectorAll('button');
    const dropdowns = block.querySelectorAll('.dropdown');


    buttons.forEach(btn => {
        btn.disabled = true; // Робимо всі кнопки неактивними
    });

    dropdowns.forEach(dropdown =>{
        console.log(dropdown);
        

        console.log(dropdown.classList);
        
        dropdown.classList.remove('active')


    });
    
}