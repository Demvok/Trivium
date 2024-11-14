// 
// Ініціалізація
// 

document.addEventListener("DOMContentLoaded", () => {
    closeModalRegister();
    closeModalConfirm();
    
    const textareas = document.querySelectorAll("textarea");

    textareas.forEach(textarea => {
        // Якщо textarea вже має текст, одразу адаптуємо висоту
        autoResize(textarea);

        // Додаємо обробник подій input для автоматичної зміни висоти
        textarea.addEventListener("input", function() {
        autoResize(textarea);
        });
    });
    
}); // Закрити форму при старті сторінки

function btnOpenDialog() {
    return openModalRegister()
} // Заглушка для кращого інтерпретування коду

function btnSubmitOrder() {
    return submitOrder()
}
function btnCloseModalRegister() {
    return closeModalRegister()
}
function btnEditOrder() {
    document.getElementById("modalOverlay2").style.display = "none";
    document.getElementById("modalOverlay").style.display = "flex";
}
function btnCloseModalConfirm() {
    return closeModalConfirm()
}

// 
// Взаємодія з базою
// 


// 
//  Робота документу
// 


//
// Робота форми

function openModalRegister() {
    // Очистити форму перед відкриттям
    document.getElementById("product").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("factory").value = "";
    document.getElementById("date").value = getTodayDate();
    document.getElementById("comment").value = "";

    document.getElementById("modalOverlay").style.display = "flex";
    
    // Показати всі опції в списках
    document.getElementById("productOptions").style.display = "block";
    document.getElementById("factoryOptions").style.display = "block";
} // Очищає + показує форму

function closeModalRegister() {
    document.getElementById("modalOverlay").style.display = "none";
} // Закриває форму

function submitOrder() {
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const factory = document.getElementById("factory").value;
    const date = document.getElementById("date").value;
    const comment = document.getElementById("comment").value;

    if (!product || !quantity || !factory || !date) {
        alert("Будь ласка, заповніть всі обов'язкові поля.");
        return;
    }

    document.getElementById("orderNumber").textContent = generateOrderNumber();
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
}

function closeModalConfirm() {
    document.getElementById("modalOverlay2").style.display = "none";
}

function autoResize() {
    const ta = document.getElementById("comment")
    ta.style.height = 'auto'; // Скидає висоту
    ta.style.height = ta.scrollHeight + 'px'; // Встановлює висоту відповідно до вмісту
}

//
// Блок випадаючого списку

function filterOptions(listId, inputValue) {
    const optionsList = document.getElementById(listId);
    const options = optionsList.querySelectorAll("div");
    optionsList.style.display = "block";

    options.forEach(option => {
        if (option.textContent.toLowerCase().includes(inputValue.toLowerCase())) {
            option.style.display = "block";
        } else {
            option.style.display = "none";
        }
    });
}

function selectOption(inputId, value) {
    document.getElementById(inputId).value = value;
    document.getElementById(inputId + "Options").style.display = "none";
}

document.addEventListener("click", function (event) {
    const productOptions = document.getElementById("productOptions");
    const factoryOptions = document.getElementById("factoryOptions");

    if (!event.target.closest(".custom-select")) {
        productOptions.style.display = "none";
        factoryOptions.style.display = "none";
    }
});


//
// Допоміжні функції

function generateOrderNumber() {
    return "BIL" + Math.floor(Math.random() * 1000000000)
} ///

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


