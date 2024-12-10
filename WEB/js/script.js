let factories = [];
<<<<<<< Updated upstream
let id = 0;
const CUTTING_PAGE = "http://127.0.0.1:5500/WEB/cutting.html"
const LACQUERING_PAGE = "http://127.0.0.1:5500/WEB/lacquering.html"

=======
const CUTTING_PAGE = "http://localhost:8080/cutting.html"
const LACQUERING_PAGE = "http://localhost:8080/lacquering.html"
>>>>>>> Stashed changes


function btnOpenDialog() {
    // return openModalConfirm()
    return openModalRegister()
} 


function btnSubmitOrder() {
    return submitOrder()
}


function btnCloseModalRegister() {
    return closeModalRegister()
}


function btnEditOrder() {
    document.getElementById("modalOverlay2").style.display = "none";
    document.getElementById("modalOverlay").style.display = "flex";
    autoResize();
}


function btnCloseModalConfirm() {
    return closeModalConfirm()
}

// 
// Взаємодія з базою
// 

// Функція фільтрації варіантів
function filterFactories() {
    const query = document.getElementById('factory').value
    const options = factoryOptions.querySelectorAll(`div`);
    factoryOptions.style.display = 'block';
    options.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        if (optionText.includes(query.toLowerCase())) {
            option.style.display = 'block';  // Показуємо варіанти, що відповідають пошуку
        } else {
            option.style.display = 'none';  // Сховуємо непотрібні варіанти
        }
    });
}

//
// Блок випадаючого списку


function filterProducts() {

    const query = document.getElementById('product').value
    const options = productOptions.querySelectorAll(`div`);

    
    productOptions.style.display = 'block';
    options.forEach(option => {
        const optionText = option.textContent.toLowerCase();
        if (optionText.includes(query.toLowerCase())) {
            option.style.display = 'block';  // Показуємо варіанти, що відповідають пошуку
        } else {
            option.style.display = 'none';  // Сховуємо непотрібні варіанти
        }
    });
}


// 
//  Робота документу
// 


//
// Робота форми

async function openModalRegister(orderCode) {
    // Перевіряємо, чи передано об'єкт order
    
    if (orderCode) {
       await fetchOrder(orderCode);
    }
    
    
    
    


    if (ORDER_INFO) {
        document.getElementById("product").value = ORDER_INFO.product_name || "";
        document.getElementById("quantity").value = ORDER_INFO.order_qt || "";
        document.getElementById("factory").value = ORDER_INFO.factory_code || ""; // Якщо factory є в order
        // Розбиваємо на частини
        const [day, month , year] = ORDER_INFO.order_date.split(".");

        // Форматуємо у YYYY-MM-DD
        const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        
        
        document.getElementById("date").value = formattedDate;
        document.getElementById("comment").value = ORDER_INFO.comments || "";
    } else {
        // Якщо об'єкт не передано, очищаємо форму
        document.getElementById("product").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("factory").value = "";
        document.getElementById("date").value = getTodayDate();
        document.getElementById("comment").value = "";
    }

    // Відкриваємо модальне вікно
    document.getElementById("modalOverlay").style.display = "flex";

} // Очищає + показує форму


function closeModalRegister() {
    document.getElementById("modalOverlay").style.display = "none";
    ORDER_INFO = null;
} // Закриває форму


function submitOrder() {

    let order_code;

    

    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const factory = document.getElementById("factory").value;
    const date = document.getElementById("date").value;
    const comment = document.getElementById("comment").value;
    if (ORDER_INFO) {
        order_code = ORDER_INFO.order_code;
        
    }else{
        order_code = generateOrderNumber(factory, date, product)
    }
    

    if (!product || !quantity || !factory || !date) {
        alert("Будь ласка, заповніть всі обов'язкові поля.");
        return;
    }

    console.log(order_code);
    

    document.getElementById("OrderId").textContent = order_code;
    document.getElementById("dateConfirm").value = date;
    document.getElementById("productConfirm").value = product;
    document.getElementById("quantityConfirm").value = quantity;
    document.getElementById("factoryConfirm").value = factory;
    document.getElementById("commentConfirm").value = comment;




    closeModalRegister();
    openModalConfirm();
} // Записує вибрані значення + (*) підтягує потрібне з бази по запиту + записує параметри у форму підтвердження

function openModalConfirm() {
    document.getElementById("modalOverlay2").style.display = "flex";
    autoResize();
}

function closeModalConfirm() {
    AddOrder();
    document.getElementById("modalOverlay2").style.display = "none";
}

function autoResize() {
    var ta = document.getElementById("comment")
    ta.style.height = 'auto'; // Скидає висоту
    ta.style.height = ta.scrollHeight >= 40 ? ta.scrollHeight + 'px' : "40px"; // Встановлює висоту відповідно до вмісту
    
    ta = document.getElementById("commentConfirm")
    ta.style.height = 'auto'; // Скидає висоту
    ta.style.height = ta.scrollHeight >= 40 ? ta.scrollHeight + 'px' : "40px"; // Встановлює висоту відповідно до вмісту
}

//
// Допоміжні функції

function generateOrderNumber(_factoryName, date, product) {
    factoryCode = factories.find(item => item.name == _factoryName);
    return _factoryName.slice(0, 3).toUpperCase() + date.split("-")[0].slice(-2) + extractThreeDigits(product) + orders.length
} ///

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function extractThreeDigits(productCode) {
    // Визначаємо, якого типу продукт
    
    // Кейс 1: продукт має формат 0,14x918x925 G/C
    const case1 = productCode.match(/x(\d+)x/); // Знаходимо цифри між "x"
    if (case1 != null) {
        return case1[1]
    }
    else {
        // Кейс 2 і 3: продукт має формат OT070-ELQ7013A9A або OT62-ELQ6216A2A
        const case2 = productCode.match(/^OT(\d+)/); // Знаходимо цифри після "OT"
        
        if (case2) {
        const digits = case2[1];
        return digits.length === 3 ? digits : digits.padStart(3, '0'); // Додаємо нуль, якщо цифр 2
        }
    }    
    return null; // Якщо формат не розпізнано
}


function parseDate(date) {
    if (date == null) return "";
    const [day, month , year] = date.split(".");
    return new Date(year, month-1, day)    
}



function goToPageWithParams(button, page_url) {
    const url = new URL(page_url);
    const parentRow = button.closest('.table-row')
    const orderId = parentRow.querySelector(".table-content-row > div:first-child").textContent.trim();

    if (orderId) {
        console.log("Order ID:", orderId);
    } else {
        console.error("Не знайдено елемент table-row.");
    }
    
    params = { "orderId" : orderId}

    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });

    location.assign(url);
    
}


async function AddOrder() {
    let order_data = {}


    const order_code = document.getElementById("OrderId").innerText;
    const order_date = document.getElementById("dateConfirm").value
    const product_name = document.getElementById("productConfirm").value
    const quantity = document.getElementById("quantityConfirm").value
    const factory = document.getElementById("factoryConfirm").value
    const status = document.getElementById("status").selectedIndex;
    const comment = document.getElementById("commentConfirm").value


    order_data = {
        id : 1,
        order_code : order_code,
        order_date : toCorrectDateFormat(order_date),
        product_name : product_name,
        order_qt : quantity,
        factory_code : factory,
        comments : comment,
        order_status : status
    }


    saveToFile(order_data);
    await fetchData();
    

    
}


function toCorrectDateFormat(date){
    const [year, month, day] = date.split('-');
    
    // Return the formatted date in DD.MM.YYYY format
    return `${day}.${month}.${year}`;
}


function saveToFile(data) {
    fetch('/api/orders', {
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






