let ORDER_INFO;
let PRODUCT_INFO;
let COILS_INFO;
let PARCEL_INFO;


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

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');





    

// -----------------------------------------------------------------------------


async function getOrder1() {
    const orderId = new URLSearchParams(window.location.search).get('orderId'); // Отримуємо orderId з URL
    const response = await fetch('data/dimOrder.json');
    const data = await response.json();
    const orderDetails = data.find(item => item.order_code === orderId); // Вибірка за orderId

    if (orderDetails) {
        const product = orderDetails.product_name;        
        data_info.product = product;
        document.getElementById("order_id").innerText = `Замовлення № ${orderId}`
        document.getElementById("order_date").innerText = `Дата замовлння: ${orderDetails.order_date}`



        return orderDetails;
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
        return productDetails
    } else {
        console.error("Product not found");
    }
}


async function getCoil1(coilCode) {
    
    
    const response = await fetch('data/data_coils.json');
    const data = await response.json();

    const coilDetails = data.filter(item => item["1C"] === coilCode );

    

    if (coilDetails.length > 0) {
        
        return coilDetails;
        
    } else {
        console.error("Coils not found");
    }
    
}


async function getParcel(order_code) {
    const response = await fetch('data/dimParcels.json');
    const data = await response.json();

    const parcelsDetails = data.filter(item => item.fk_order_id === order_code);

    

    if (parcelsDetails.length > 0) {
        
        return parcelsDetails;
        
    } else {
        console.error("Coils not found");
    }
    
}


function renderCoilDropDown(data) {
    const dropdownContainers = document.getElementsByClassName('roll dropdown-content');
    for (let index = 0; index < dropdownContainers.length; index++) {

        dropdownContainers[index].innerHTML = '';
        try {
            data.forEach(coil => {
            
                const optionElement = document.createElement('a');
                optionElement.href = '#';
                optionElement.textContent = coil["number-coil"];
                optionElement.addEventListener('click', () => {
                    const button = dropdownContainers[index].closest('.roll-number').querySelector('button');
                    button.innerText = coil["number-coil"];
                    
                    
                });
        
                dropdownContainers[index].appendChild(optionElement);
            });
        } catch (error) {
            console.log(error);
            
        }
        
    } 
}


function renderParcelDropDown(data) {
    const dropdownContainers = document.getElementsByClassName('print dropdown-content');
    
    for (let index = 0; index < dropdownContainers.length; index++) {

        dropdownContainers[index].innerHTML = '';

        try {
            data.forEach(parcel => {
            
                const optionElement = document.createElement('a');
                optionElement.href = `print.html?orderId=${orderId}&parcel=${parcel.parcel_id}`;
                optionElement.textContent = parcel["\u2116 in order"];
                
                dropdownContainers[index].appendChild(optionElement);
            });
        } catch (error) {
            console.log(console.error());
            
        }
        
    } 
}


async function fetcData() {
    ORDER_INFO = await getOrder1();
    PRODUCT_INFO = await getFormat1(ORDER_INFO.product_name);
    COILS_INFO = await getCoil1(PRODUCT_INFO.ic_codes_for_coils);
    PARCEL_INFO = await getParcel(orderId);
    console.log(PARCEL_INFO);
  
}

document.addEventListener("DOMContentLoaded", async () => {
    await fetcData();
    renderCoilDropDown(COILS_INFO);
    renderParcelDropDown(PARCEL_INFO);
    populateFields();
    
});



// -----------------------------------------------------------------------------------------------------------------------

let rollIndex = 0;

let packsCount = [0]


// Function to populate the fields with data from the "database"
function populateFields() {
    
    // document.getElementById('planner').value = database.planner;
    // document.getElementById('estimated-quantity').value = database.estimatedQuantity;
    document.getElementById('roll-name').value =  PRODUCT_INFO.coil;
    document.getElementById('product').value = ORDER_INFO.product_name;
    // document.getElementById('actual-quantity').value = database.actualQuantity;
    document.getElementById('cutting-format-1c').value =  PRODUCT_INFO.cutting_format_1c;
    document.getElementById('roll-code-1c').value = PRODUCT_INFO.ic_codes_for_coils;
    document.getElementById('cutting-format').value = PRODUCT_INFO.cutting_format;
    document.getElementById('cutting-code-1c').value = PRODUCT_INFO.cutting_code_1c;
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
                    </div>
                </div>
            </div>
            <button class="create-button button-green" data-index="${rollIndex}" onclick="crteatePack(this)">Створити пачку</button>

            <div class="print-label dropdown active">

                <button class="dropbtn">Надрукувати етикетку <i class="fa fa-caret-down"></i></button>
                <div class="print dropdown-content">
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

    renderCoilDropDown(COILS_INFO);
    renderParcelDropDown(PARCEL_INFO);
}


//________________________________________________________________________________________________________________________________


function crteatePack(btn) {

    index = btn.getAttribute("data-index");
    
    const modal_window = document.getElementById("myModal");

    document.getElementById("quantity-input").value = PRODUCT_INFO.qt_per_parcel

    packsCount[index]++;
    
    modal_window.style.display = "block";
    modal_window.setAttribute("data-roll-index", index)
}



function closeModal() {
    const modal_window = document.getElementById("myModal");
    index = modal_window.getAttribute("data-roll-index");


    document.getElementsByClassName('pack-count')[index].innerText = packsCount[index];
    
    document.getElementsByClassName("roll-number dropdown")[index].classList.remove("active")
    modal_window.style.display = "none";
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