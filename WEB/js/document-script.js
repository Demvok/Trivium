let ORDERS;
let filterOrdersList;

document.addEventListener("DOMContentLoaded", () => {
    
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    const pageSize = 10; // Кількість рядків на сторінку
    let currentPage = 0; // Поточна сторінка

    fetchData();

    // Обробники для кнопок пагінації
    prevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            renderTable(filterOrdersList, currentPage);
        }
    });

    nextBtn.addEventListener("click", () => {
        if ((currentPage + 1) * pageSize < orders.length) {
            currentPage++;
            renderTable(filterOrdersList, currentPage);
        }
    });
});

async function fetchData() {
    try {
        const response = await fetch('/api/orders'); // Замініть на шлях до вашого JSON-файлу
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        orders = await response.json();
        
                
        // Перевірка структури даних
        if (!Array.isArray(orders) || !orders.every(order => typeof order.order_code !== 'undefined')) {
            throw new Error("Invalid data structure: Missing 'id_orders' in some objects");
        }

        filterOrdersList = Array.from(orders);
        renderTable(filterOrdersList, 0);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


document.addEventListener("click", function (event) {
    const productOptions = document.getElementById("productOptions");
    const factoryOptions = document.getElementById("factoryOptions");

    if (!event.target.closest(".custom-select.select-factory")) {
        factoryOptions.style.display = "none";
    }
    if (!event.target.closest(".custom-select.select-product")) {
        productOptions.style.display = "none";
    }
});


document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/orders')
    .then(response => response.json())
    .then(data => {
        // console.log('Orders:', data);
        // Display the orders on the page
    })
    .catch(error => console.error('Error fetching orders:', error));
    
    CommentAutoResize()
    ProductListLoader()
    FactoryListLoader()
    fillMaterialTable()
});

function renderTable(data, page) {
    const sortedData = data.sort((a, b) => parseDate(b.order_date) - parseDate(a.order_date));

    const tableContent = document.getElementById("table-content");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    tableContent.innerHTML = "";

    const pageSize = 10;

    const start = page * pageSize;
    const end = start + pageSize;

    const pageData = sortedData.slice(start, end);

    pageData.forEach((order, index) => {
        const block = document.createElement("div");
        block.classList.add("table-row");

        const row_info = document.createElement("div");
        row_info.classList.add("table-content-row");

        order_in_text = ["Відкрите", "Закрите"]

        row_info.innerHTML = `
            <div>${order.order_code}</div>
            <div>${order.product_name}</div>
            <div>${order.order_qt}</div>
            <div>${order.order_date}</div>
            <div>${order_in_text[order.order_status] || "Помилка статусу"}</div>
            <div>${order.comments || ""}</div>
            <div class="edid-order-btn" onclick="openModalRegister('${order.order_code}')">
                <img src="img/Edit.svg" alt="Редагувати">
            </div>
            <div class="actions-column">
                <button id="goToCutting" onclick="goToPageWithParams(this, CUTTING_PAGE)"><img src="img/Cut.svg" alt="Порізка"></button>
                <button id="goToLaquering" onclick="goToPageWithParams(this, LACQUERING_PAGE)"><img src="img/paintbrush.svg" alt="Лакування"></button>
            </div>
        `;

        block.appendChild(row_info);
        tableContent.appendChild(block);
    });

    // Ввімкнення/вимкнення кнопок навігації
    prevBtn.disabled = page === 0;
    nextBtn.disabled = end >= data.length;
}

//
// Блок пошуковика
//

function filteringOrders(value) {
    filterOrdersList = [];
    orders.forEach(order => {
        // Перевіряємо, чи існує order.id_orders, перш ніж викликати includes
        console.log(order, value);
        
        if (order.order_code && order.order_code.toString().toLowerCase().includes(value)) {
            filterOrdersList.push(order);
        }
    });
}

// Додаємо обробник події для кнопки
document.getElementById("search-btn").addEventListener("click", function () {
    const searchValue = document.getElementById("order-search").value.trim().toLowerCase();

    // Всі рядки таблиці
    // const rows = document.querySelectorAll(".table-content-row");

    filteringOrders(searchValue);

    renderTable(filterOrdersList, 0)
    
});



