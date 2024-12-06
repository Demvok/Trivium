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
        
        console.log(orderId);
        
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



        await getCoil1(coilCode); // передаємо coil_code_2 для пошуку в data_coils.json
    } else {
        console.error("Product not found");
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




document.addEventListener("DOMContentLoaded", function() {
    // fetch('data/orders.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         document.getElementById('order-number').value =  data.order_number;
    //         document.getElementById('order-date').value = data.order_date;
    //         document.getElementById('responsible-person').value = data.responsible_person;
    //         document.getElementById('product').value =data.product;
    //         document.getElementById('specification-number').value = data.specification_number;
    //         document.getElementById('coating').value = data.coating;

    //         const orderItems = data.items;
    //         const orderItemsContainer = document.getElementById('order-items');
    //         orderItems.forEach(item => {
    //             const row = document.createElement('tr');
    //             if (item.package_number === '345324201/3') {
    //                 row.classList.add('highlight');
    //             }
    //             row.innerHTML = `
    //                 <td>${item.package_number}</td>
    //                 <td>${item.quantity}</td>
    //                 <td>${item.creation_date}</td>
    //                 <td>${item.status}</td>
    //             `;
    //             row.onclick = () => showModal(row);
    //             orderItemsContainer.appendChild(row);
    //         });
    //     })
    //     .catch(error => console.error('Error fetching order data:', error));
});


function createTabs(numTabs) {
    const tabsContainer = document.querySelector('.tabs');
    tabsContainer.innerHTML = '';
    for (let i = 0; i < numTabs; i++) {
        const tab = document.createElement('div');
        tab.textContent = `${i + 1} прогін`;
        tab.onclick = () => switchTab(i);
        if (i === 0) {
            tab.classList.add('active');
        }
        tabsContainer.appendChild(tab);
    }
}

function switchTab(tabIndex) {
    const tabs = document.querySelectorAll('.tabs div');
    tabs.forEach((tab, index) => {
        if (index === tabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

function showModal(row) {
    createTabs(3);
    console.log(row.querySelectorAll('td')[0].textContent);
    
    document.getElementById("pack-number").textContent = row.querySelectorAll('td')[0].textContent


    document.querySelector('.modal').style.display = 'flex';
}

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

