const orders = [
    { 'id_orders': 'BUF21096106', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 1, 'date': "14/1/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 2, 'date': "17/2/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 3, 'date': "18/3/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 4, 'date': "27/4/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 5, 'date': "26/5/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 6, 'date': "25/6/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 7, 'date': "24/7/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 8, 'date': "23/8/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 9, 'date': "28/9/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096106', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 10, 'date': "27/10/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 11, 'date': "29/11/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 12, 'date': "2/12/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 13, 'date': "13/1/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 14, 'date': "14/1/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 15, 'date': "15/1/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 16, 'date': "16/1/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 17, 'date': "17/1/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 18, 'date': "18/1/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 19, 'date': "19/1/2020", 'status': "Виконується", 'comment': "0" },
    { 'id_orders': 'BUF21096105', "product": "OT096 0,20 ALU/C", 'factory': "Bufallo", 'quantity': 20, 'date': "20/1/2020", 'status': "Виконується", 'comment': "0" },

]

let filterOrdersList = Array.from(orders);


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
        const tableContent = document.getElementById("table-content");
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");
        tableContent.innerHTML = "";
    

        const pageSize = 10;


        const start = page * pageSize;
        const end = start + pageSize;
        const pageData = data.slice(start, end);
    
        pageData.forEach((order, index) => {
            const row = document.createElement("div");
            row.classList.add("table-content-row");
    
            row.innerHTML = `
                <div>${order.id_orders}</div>
                <div>${order.product}</div>
                <div>${order.factory}</div>
                <div>${order.quantity}</div>
                <div>${order.date}</div>
                <div>${order.status}</div>
                <div>${order.comment}</div>
                <div class="edid-order-btn" onclick="openModalRegister(${index+start})"">
                    <img src="img/Edit.svg"></img>
                </div>
            `;
            
    
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

    

    // Показати першу сторінку
    renderTable(filterOrdersList, currentPage);

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





function filteringOrders(value){
    filterOrdersList = []
    orders.forEach(order => {
        if (order.id_orders.includes(value)) {
            filterOrdersList.push(order)
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