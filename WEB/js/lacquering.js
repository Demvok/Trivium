const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
let ORDER_DATA;
let PRODUCT_DATA;


// -----------------------------------------------------------------------------


async function getOrder1() {
    const orderId = new URLSearchParams(window.location.search).get('orderId'); // Отримуємо orderId з URL
    const response = await fetch('data/data.json');
    const data = await response.json();
    const orderDetails = data.find(item => item.order_code === orderId); // Вибірка за orderId

    if (orderDetails) {
        const product = orderDetails.product_name;

        document.getElementById("order-number").value = orderId
        document.getElementById("order-date").value = orderDetails.order_date
        document.getElementById("product").value = orderDetails.product_name



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

        document.getElementById("specification-number").value = productDetails.specification;
        document.getElementById("coating").value = productDetails.varnishing_type;


    } else {
        console.error("Product not found");
    }
}

async function onStart() {
    await getOrder1();
}


document.addEventListener("DOMContentLoaded", async () => {
    onStart();
    ORDER_DATA = await fetchOrderData();
    PRODUCT_DATA = await FetchPoductData(ORDER_DATA.product_name)
    console.log(PRODUCT_DATA);
    
    const Parcels = await FetchParcelData(ORDER_DATA.order_code)
    renderParcelTable(Parcels)
});






// -----------------------------------------------------------------------------------------------------------------------


function createTabs(numTabs) {
    const tabsContainer = document.querySelector('.tabs');
    const contentContainer = document.querySelector('.tab-contents');

    tabsContainer.innerHTML = '';
    contentContainer.innerHTML = '';

    for (let i = 0; i < numTabs; i++) {
        // Створення табів
        const tab = document.createElement('div');
        tab.textContent = `${i + 1} прогін`;
        tab.classList.add('tab');
        tab.onclick = () => switchTab(i);

        if (i === 0) {
            tab.classList.add('active');
        }
        tabsContainer.appendChild(tab);

        // Створення відповідного вмісту для кожного таба
        const tabContent = document.createElement('div');
        tabContent.classList.add('tab-content');
        tabContent.innerHTML = `
            <div class="form-group">
                <label for="lac-${i}">Лак :</label>
                <input type="text" id="lac-${i}" value="${PRODUCT_DATA[`varnishing_${i+1}`]}" readonly>
            </div>
            <div class="form-group">
                <label for="lac-used-${i}">Лаку використано (КГ):</label>
                <input type="number" id="lac-used-${i}" value="15">
            </div>
            <div class="form-group">
                <label for="solvent-${i}">Розчинник (КГ):</label>
                <input type="number" id="solvent-${i}" value="15">
            </div>
            <div class="form-group">
                <label for="status-${i}">Статус:</label>
                <select id="status-${i}">
                    <option>В обробці</option>
                    <option>Завершити</option>
                </select>
            </div>
            <div class="form-group">
                <button>Підтвердити</button>
            </div>
        `;

        if (i !== 0) {
            tabContent.style.display = 'none'; // Ховаємо всі таби, крім першого
        }

        contentContainer.appendChild(tabContent);
    }
}



function switchTab(tabIndex) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    // Деактивація всіх табів і ховання вмісту
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => (content.style.display = 'none'));

    // Активація вибраного таба та показ вмісту
    tabs[tabIndex].classList.add('active');
    contents[tabIndex].style.display = 'block';
}

function showModal(row) {

    const numOfTabs = [PRODUCT_DATA.varnishing_1 != null, PRODUCT_DATA.varnishing_2 != null,
        PRODUCT_DATA.varnishing_3 != null,
        PRODUCT_DATA.varnishing_4 != null].reduce((acc, current) => acc + current, 0);

    console.log(numOfTabs);
    

    createTabs(numOfTabs);

    document.getElementById("pack-number").textContent = row.querySelectorAll('td')[0].textContent


    document.querySelector('.modal').style.display = 'flex';
}

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

// ------------------------------------------------------------------------------------------------------------------------------



async function fetchOrderData() {
    const orderId = new URLSearchParams(window.location.search).get('orderId'); // Отримуємо orderId з URL
    const response = await fetch('data/data.json');
    const data = await response.json();

    const orderDetails = data.find(item => item.order_code === orderId); // Вибірка за orderId


    return orderDetails;
}

async function FetchPoductData(product) {
    const response = await fetch('data/technical_sheet.json')
    const data = await response.json();

    
    const productDescription = data.find(item => item.product_name === product)

    if (productDescription) {
        return productDescription;
        
        
    }

}



async function FetchParcelData(orderID) {
    const response = await fetch('data/dimParcels.json')
    const data = await response.json();

    const parcelByOrder = data.filter(item => item.fk_order_id === orderID)


    if (parcelByOrder.length > 0) {
        return parcelByOrder;
    }

}



function renderParcelTable(data) {

    console.log(data);


    const orderItemsContainer = document.getElementById('order-items');

    orderItemsContainer.innerHTML = "";

    data.forEach((parcel, index) => {

        const row = document.createElement('tr');

        const date = new Date(parcel["parcel_created_date"]);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        row.innerHTML = `
            <td>${parcel["\u2116 in order"]}</td>
            <td>${parcel["qt_in_parcel"]}</td>
            <td>${formattedDate}</td>
            <td>${parcel["parcel_status"]}</td>
        `;

        row.onclick = () => showModal(row);
        orderItemsContainer.appendChild(row);

    });

}