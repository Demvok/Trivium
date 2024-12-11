// let ORDER_INFO;
// let PRODUCT_INFO;
// let COILS_INFO;
// let PARCELS_INFO;


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
        data_info["roll-name"] = PRODUCT_INFO.coil;
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



function chooseCoil(event, coil_name) {
    const container = event.target.closest('.roll-container')
    console.log(container);

    container.querySelector('.create-button').disabled = false;

    container.querySelector('.print-label.dropdown').classList.add('active');

    container.querySelector('.close-roll-button').disabled = false;

    container.querySelector('.roll-number.label').innerText = coil_name;

    container.querySelector('.pack-count').innerText = PARCELS_INFO.filter(item => item.coil_name === coil_name).length

    const parcelDropdownContainer =  container.querySelector('.print.dropdown-content');

    renderParcelDropDown(PARCELS_INFO, coil_name, parcelDropdownContainer)
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
                optionElement.addEventListener('click', (event) => {

                    chooseCoil(event, coil["number-coil"]);



                });

                dropdownContainers[index].appendChild(optionElement);
            });
        } catch (error) {
            console.log(error);

        }

    }
}


function renderParcelDropDown(data, coil_name, dropdownContainer) {

    const filteringData = data.filter(item => item.coil_name === coil_name)



    console.log(dropdownContainer);
    
    dropdownContainer.innerHTML = '';

    try {
        filteringData.forEach(parcel => {

            const optionElement = document.createElement('a');
            optionElement.onclick = () => {
                showModal(parcel.parcel_name);
            };
            optionElement.textContent = parcel.parcel_name;

            dropdownContainer.appendChild(optionElement);
        });
    } catch (error) {
        console.log(console.error());

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
    // renderParcelDropDown(PARCELS_INFO);
    populateFields();


    const uniqueCoilNames = [...new Set(PARCELS_INFO.map(item => item.coil_name))];
    if (uniqueCoilNames.length > 0) {
        for (let index = 0; index < uniqueCoilNames.length; index++) {
            console.log(uniqueCoilNames[index]);
            addRollInfo(uniqueCoilNames[index]);
            const parcelDropdown = document.getElementById('rolls-container').lastElementChild.querySelector('.print.dropdown-content')
            renderParcelDropDown(PARCELS_INFO, uniqueCoilNames[index], parcelDropdown)
            
        }
    }
    

});



// -----------------------------------------------------------------------------------------------------------------------

// Function to populate the fields with data from the "database"
function populateFields() {

    // document.getElementById('planner').value = database.planner;
    // document.getElementById('estimated-quantity').value = database.estimatedQuantity;
    document.getElementById('roll-name').value = PRODUCT_INFO.coil;
    document.getElementById('product').value = ORDER_INFO.product_name;
    // document.getElementById('actual-quantity').value = database.actualQuantity;
    document.getElementById('cutting-format-1c').value = PRODUCT_INFO.cutting_format_1c;
    document.getElementById('roll-code-1c').value = PRODUCT_INFO.ic_codes_for_coils;
    document.getElementById('cutting-format').value = PRODUCT_INFO.cutting_format;
    document.getElementById('cutting-code-1c').value = PRODUCT_INFO.cutting_code_1c;
    document.getElementById('estimated-quantity').value = ORDER_INFO.order_qt;
    document.getElementById('actual-quantity').value = PARCELS_INFO.reduce((sum, parcel) => {
        return sum + (parseInt(parcel.qt_in_parcel) || 0); // Add 0 if qt_in_parcel is null or undefined
    }, 0);

    // Затичка ака Костиль
    // document.getElementsByClassName('pack-count')[0].innerText = 0;

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

function addRollInfo(coil_name) {
    const parcelsCount = PARCELS_INFO.filter(item => item.coil_name === coil_name).length;

    const newRollInfoTemplate = `<div class="roll-container">
            <div class="roll-number">
                <label class="roll-number label">${coil_name || '№ Рулона'}</label>
                <div class="roll-number dropdown active">
                    <button class="dropbtn">Обрати рулон <i class="fa fa-caret-down"></i></button>
                    <div class="roll dropdown-content">
                    </div>
                </div>
            </div>
            <button class="create-button button-green"  onclick="crteatePack(this)" disabled>Створити пачку</button>

            <div class="print-label dropdown active">

                <button class="dropbtn">Надрукувати етикетку <i class="fa fa-caret-down"></i></button>
                <div class="print dropdown-content">
                </div>
            </div>
            <button class="close-roll-button button-orange" onclick="closeRoll(this)" disabled>Закрити рулон</button>
            <div class="info">
                <div class="info-label">К-сть створених пачок</div>
                <div class="pack-count">${parcelsCount}</div>
            </div>
            </div>
        `;
    const rollsContainer = document.getElementById('rolls-container');
    rollsContainer.insertAdjacentHTML('beforeend', newRollInfoTemplate);

    renderCoilDropDown(COILS_INFO);
    // renderParcelDropDown(PARCELS_INFO);
}


//________________________________________________________________________________________________________________________________


async function crteatePack(btn) {

    const container = btn.closest('.roll-container')
    const parcelDropdownContainer =  container.querySelector('.print.dropdown-content');


    let newParcel = {};

    // index = btn.getAttribute("data-index");

    const coil_number = container.querySelector('.roll-number.label').textContent


    const parcelInOrder = PARCELS_INFO.filter(item => item.coil_name === coil_number).length + 1

    newParcel = {
        "fk_order_id": ORDER_INFO.order_code,
        "\u2116 in order": parcelInOrder,
        "parcel_status": 0,
        "parcel_created_date": getTodayDate(),
        "qt_in_parcel": null,
        "coil_name": coil_number,
        "parcel_name": `${coil_number}-${parcelInOrder}`
    }

    saveToFile(newParcel);
    await fetcData();

    renderParcelDropDown(PARCELS_INFO, coil_number, parcelDropdownContainer);



    container.querySelector('.roll-number.dropdown').classList.remove('active');

    container.querySelector('.pack-count').innerText = PARCELS_INFO.filter(item => item.coil_name === coil_number).length



}



function closeModal() {
    const modal_window = document.getElementById("myModal");
    index = modal_window.getAttribute("data-roll-index");

    PARCEL_INFO.qt_in_parcel = document.getElementById('quantity-input').value;


    fetch(`/api/parcel/${PARCEL_INFO.parcel_name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(PARCEL_INFO),
    }).then(response => response.json())
        .then(data => console.log('Updated parcel:', data))
        .catch(error => console.error('Error:', error));

    modal_window.style.display = "none";

    document.getElementById('actual-quantity').value = PARCELS_INFO.reduce((sum, parcel) => {
        return sum + (parseInt(parcel.qt_in_parcel) || 0); // Add 0 if qt_in_parcel is null or undefined
    }, 0);

    const url = `print.html?orderId=${orderId}&parcel=${PARCEL_INFO.parcel_name}`;
    window.open(url, '_blank');


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

function showModal(parcel_name) {
    const modal_window = document.getElementById("myModal")

    PARCEL_INFO = PARCELS_INFO.find(item => item.parcel_name === parcel_name)


    myModal.querySelector('#quantity-input').value = PRODUCT_INFO.qt_per_parcel;
    modal_window.querySelector('.date').innerText = PARCEL_INFO.parcel_created_date

    modal_window.style.display = "block";


}