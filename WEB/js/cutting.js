// let ORDER_INFO;
// let PRODUCT_INFO;
// let COILS_INFO;
// let PARCEL_INFO;


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
    await fetchOrder(orderId);
    
    if (ORDER_INFO) {
        const product = ORDER_INFO.product_name;        
        data_info.product = product;
        document.getElementById("order_id").innerText = `Замовлення № ${orderId}`
        document.getElementById("order_date").innerText = `Дата замовлння: ${ORDER_INFO.order_date}`
    } else {
        console.error("Order not found");
    }
}


async function getFormat1(product) {
    
    await fetchProduct(product);
    


    if (PRODUCT_INFO) {
        const coilCode = PRODUCT_INFO.ic_codes_for_coils;
        
        
        data_info["cutting-code-1c"] = PRODUCT_INFO["1c_code"];
        
        data_info["cutting-format"] = PRODUCT_INFO.cutting_format;
        data_info["cutting-format-1c"] = PRODUCT_INFO.cutting_format_1c;
        data_info["roll-name"]  = PRODUCT_INFO.coil;
        data_info["roll-code-1c"] = PRODUCT_INFO["ic_codes_for_coils"];
        return coilCode
    } else {
        console.error("Product not found");
    }
}


async function getCoil1(coilCode) {
    
    await fetchCoils(coilCode);

    

    if (COILS_INFO.length > 0) {
        
        
    } else {
        console.error("Coils not found");
    }
    
}


async function getParcel(order_code) {
    await fetchParcels(order_code);
    
    
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
                optionElement.href = `print.html?orderId=${orderId}&parcel=${parcel.parcel_name}`;
                optionElement.textContent = parcel.parcel_name;
                
                dropdownContainers[index].appendChild(optionElement);
            });
        } catch (error) {
            console.log(console.error());
            
        }
        
    } 
}


async function fetcData() {
    await getOrder1(orderId);
    
    await getFormat1(ORDER_INFO.product_name);
    
    await getCoil1(PRODUCT_INFO.ic_codes_for_coils);

    await getParcel(orderId);
  
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
    document.getElementById('estimated-quantity').value = ORDER_INFO.order_qt;
    document.getElementById('actual-quantity').value = PARCEL_INFO.reduce((sum, parcel) => {
        return sum + (parcel.qt_in_parcel || 0); // Add 0 if qt_in_parcel is null or undefined
    }, 0);

    // Затичка ака Костиль
    document.getElementsByClassName('pack-count')[0].innerText = PARCEL_INFO.length;

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
                <div class="pack-count">${packsCount[packsCount.length - 1]}</div>
            </div>
            </div>
        `;
    const rollsContainer = document.getElementById('rolls-container');
    rollsContainer.insertAdjacentHTML('beforeend', newRollInfoTemplate);

    renderCoilDropDown(COILS_INFO);
    renderParcelDropDown(PARCEL_INFO);
}


//________________________________________________________________________________________________________________________________


async function crteatePack(btn) {

    let newParcel = {};

    index = btn.getAttribute("data-index");

    const coil_number = document.getElementsByClassName('dropbtn')[index].textContent

    newParcel = {
        "fk_order_id": ORDER_INFO.order_code,
        "\u2116 in order": PARCEL_INFO.length + 1,
        "parcel_status": 0,
        "parcel_created_date": getTodayDate(),
        "qt_in_parcel": null,
        "coil_name": coil_number,
        "parcel_name": `${coil_number}-${PARCEL_INFO.length + 1}`
    }

    saveToFile(newParcel);
    await fetcData();
    
    renderParcelDropDown(PARCEL_INFO);
    
    
    
    // const modal_window = document.getElementById("myModal");

    document.getElementsByClassName("pack-count")[0].innerText = PARCEL_INFO.length

    // packsCount[index]++;
    
    // modal_window.style.display = "block";
    // modal_window.setAttribute("data-roll-index", index)
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



function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${day}.${month}.${year}`;
}


function saveToFile(data) {
    fetch('/api/parcel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Order added:', data);
            // Refresh the order list or update the UI
        })
        .catch(error => console.error('Error adding order:', error));
}