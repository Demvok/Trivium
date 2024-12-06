let data_info = {
    "planner": "",
    "estimated-quantity": "",
    "roll-name": "",
    "product": "",
    "actual-quantity": "",
    "cutting-format-1c": "",
    "roll-code-1c": "",
    "cutting-format": "",
    "cutting-code-1c": "",
    "pack-count": "",
}



// Simulated database data

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
console.log(orderId); // виведе "BIL248961719"



    

// -----------------------------------------------------------------------------


async function getOrder1() {
    const orderId = new URLSearchParams(window.location.search).get('orderId'); // Отримуємо orderId з URL
    const response = await fetch('data/data.json');
    const data = await response.json();
    const orderDetails = data.find(item => item.order_code === orderId); // Вибірка за orderId

    if (orderDetails) {
        const product = orderDetails.product_name;
        console.log(product);
        
        data_info.product = product;
        document.getElementById("order_id").innerText = `Замовлення № ${orderId}`
        document.getElementById("order_date").innerText = `Дата замовлння: ${orderDetails.order_date}`



        await getFormat1(product);
    } else {
        console.error("Order not found");
    }
}


async function getFormat1(product) {
    const response = await fetch('data/technical_sheet.json');
    const data = await response.json();
    const productDetails = data.find(item => item.product_name === product);

    if (productDetails) {
        const coilCode = productDetails.ic_codes_for_coils;
        console.log(productDetails["1c_code"]);
        
        data_info["cutting-code-1c"] = productDetails["1c_code"];
        data_info["cutting-format"] = productDetails.cutting_format;
        data_info["cutting-format-1c"] = productDetails.cutting_format_1c;
        data_info["roll-name"]  = productDetails.coil;
        data_info["roll-code-1c"] = productDetails["ic_codes_for_coils"];
        await getCoil1(coilCode); // передаємо coil_code_2 для пошуку в data_coils.json
    } else {
        console.error("Product not found");
    }
}


async function getCoil1(coilCode) {
    
    const response = await fetch('data/data_coils.json');
    const data = await response.json();

    const coilDetails = data.filter(item => item["1C"] === coilCode && item.status === "stock");

    const dropdownContainer = document.getElementsByClassName('roll dropdown-content')[0];
    
    dropdownContainer.innerHTML = ''; // Очищаємо попередні варіанти перед додаванням нових

    if (coilDetails.length > 0) {
        
        coilDetails.forEach(coil => {
            
            const optionElement = document.createElement('a');
            optionElement.href = '#';
            optionElement.textContent = coil["number-coil"];
            optionElement.addEventListener('click', () => {
                alert(`Обрано рулон: ${coil.number_coil}`);
            });

            dropdownContainer.appendChild(optionElement);
        });
    } else {
        console.error("Coils not found");
    }
}

async function onStart() {
    await getOrder1();
    populateFields();
}

document.addEventListener("DOMContentLoaded", () => {
    onStart()
});







// -----------------------------------------------------------------------------------------------------------------------

let rollIndex = 0;

let packsCount = [0]


// Function to populate the fields with data from the "database"
function populateFields() {
    console.log(data_info);
    
    // document.getElementById('planner').value = database.planner;
    // document.getElementById('estimated-quantity').value = database.estimatedQuantity;
    document.getElementById('roll-name').value = data_info["roll-name"];
    document.getElementById('product').value = data_info.product;
    // document.getElementById('actual-quantity').value = database.actualQuantity;
    document.getElementById('cutting-format-1c').value = data_info["cutting-format-1c"];
    document.getElementById('roll-code-1c').value = data_info["roll-code-1c"];
    document.getElementById('cutting-format').value = data_info["cutting-format"];
    document.getElementById('cutting-code-1c').value = data_info["cutting-code-1c"];
    document.getElementsByClassName('pack-count')[0].innerText = packsCount[0]

}

// Call the function to populate the fields when the page loads

function toggleMoreInfo() {
    const moreInfo = document.getElementById('more-info');
    if (moreInfo.style.display === 'none' || moreInfo.style.display === '') {
        moreInfo.style.display = 'flex';
    } else {
        moreInfo.style.display = 'none';
    }
}

function addRollInfo() {
    rollIndex++;
    packsCount.push(0)
    const newRollInfoTemplate = `<div class="roll-container">
            <div class="roll-number">
                <label class="roll-number label">№ Рулона</label>
                <div class="roll-number dropdown active">
                    <button class="dropbtn">Обрати рулон <i class="fa fa-caret-down"></i></button>
                    <div class="roll dropdown-content">
                        <a href="#">Option 1</a>
                        <a href="#">Option 2</a>
                        <a href="#">Option 3</a>
                    </div>
                </div>
            </div>
            <button class="create-button button-green" data-index="${rollIndex}" onclick="crteatePack(this)">Створити пачку</button>

            <div class="print-label dropdown active">

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


function crteatePack(btn) {

    index = btn.getAttribute("data-index");

    packsCount[index]++;
    document.getElementsByClassName('pack-count')[index].innerText = packsCount[index];
    document.getElementById("myModal").style.display = "block";
}



function closeModal() {
    document.getElementById("myModal").style.display = "none";
}



function closeRoll(element) {
    const block = element.closest('.roll-container'); // Знаходимо батьківський блок
    const buttons = block.querySelectorAll('button');
    const dropdowns = block.querySelectorAll('.dropdown');


    buttons.forEach(btn => {
        btn.disabled = true; // Робимо всі кнопки неактивними
    });

    dropdowns.forEach(dropdown => {

        dropdown.classList.remove('active')


    });

}