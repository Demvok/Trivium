let orders;

let filterOrdersList;

async function fetchData() {
    try {
        const response = await fetch('data/data.json'); // Замініть на шлях до вашого JSON-файлу
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
    CommentAutoResize()
    ProductListLoader()
    FactoryListLoader()
    fillMaterialTable()
});




///////// FIX ME




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
            const row = document.createElement("div");
            row.classList.add("table-content-row");
    
            row.innerHTML = `
                <div>${order.order_code}</div>
                <div>${order.product_name}</div>
                <div>${order.factory_code}</div>
                <div>11111</div>
                <div>${order.order_date}</div>
                <div>${order.order_status}</div>
                <div>${order.comments}</div>
                <div class="edid-order-btn" onclick="openModalRegister(${index+start})"">
                    <img src="img/Edit.svg"></img>
                </div>
            `;
            
            row.onclick = () => goToPageWithParams(baseURL, {orderId : order.order_code})
            tableContent.appendChild(row);
        });
    
        // Ввімкнення/вимкнення кнопок пагінації
        prevBtn.disabled = page === 0;
        nextBtn.disabled = end >= data.length;
    }

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





function filteringOrders(value) {
    filterOrdersList = [];
    orders.forEach(order => {
        // Перевіряємо, чи існує order.id_orders, перш ніж викликати includes
        if (order.id && order.id.toString().toLowerCase().includes(value)) {
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