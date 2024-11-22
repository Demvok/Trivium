const orders = [
    { id: "BUF21096105", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096105", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096105", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096105", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096105", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096105", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096105", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096105", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096105", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "1" },
    { id: "BUF21096106", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "1" },
    { id: "BUF21096106", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096106", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096106", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "1" },
    { id: "BUF21096106", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096106", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096106", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },

    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },

    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },

    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },

    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },
    { id: "BUF21096107", product: "OT096 0,20 ALU/C", quantity: 28000, date: "1/13/2020", status: "Виконується", comment: "0" },


    // Додайте більше даних для тестування...
];

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
                <div>${order.id}</div>
                <div>${order.product}</div>
                <div>${order.quantity}</div>
                <div>${order.date}</div>
                <div>${order.status}</div>
                <div>${order.comment}</div>
                <div class="edid-order-btn" onclick="openModalRegister(${index})"">
                    <img src="img/Edit.svg"></img>
                </div>
            `;
            console.log(String(JSON.stringify(order)));
            
    
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
        if (order.id.includes(value)) {
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