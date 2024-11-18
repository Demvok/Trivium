let factories = [];
let id = 0;




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
    }); // редагування розміру коментаря

    const factoryInput = document.getElementById('factory');
    const factoryOptions = document.getElementById('factoryOptions');

    // Функція для завантаження CSV файлу (наприклад, 'factories.csv')
    fetch('./data/factories.csv')
        .then(response => response.text())
        .then(data => {
            // Парсинг CSV                                    
            const lines = data.trim().split('\n');
            lines.slice(1).forEach(line => {                
                const [factoryCode, factoryName] = line.trim().split(',');    
                factories.push({ name: factoryName, code: factoryCode });


                // Додавання кожного заводу до списку
                const option = document.createElement('div');
                option.textContent = factoryName;
                option.onclick = () => {                         
                    factoryInput.value = factoryName;
                    factoryOptions.style.display = 'none'
                    
                }
                factoryOptions.appendChild(option);

            });
        });
        
    

}); // Закрити форму при старті сторінки

function btnOpenDialog() {
    // return openModalConfirm()
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
    id--;
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

    document.getElementById("OrderId").textContent = generateOrderNumber(factory, date, product);
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

    if (!event.target.closest(".custom-select.select-factory")) {
        factoryOptions.style.display = "none";
    }
    if (!event.target.closest(".custom-select.select-product")) {
        productOptions.style.display = "none";
    }
});

document.getElementById('factory').addEventListener('input', () => {
    document.getElementById('factoryOptions').style.display = "block";
})


//
// Допоміжні функції

function generateOrderNumber(_factoryName, date, product) {
    console.log(_factoryName);
    factoryCode = factories.find(item => item.name == _factoryName);
    console.log(factoryCode);
    
    id++;

    return _factoryName.slice(0, 3).toUpperCase() + date.split("-")[0].slice(-2) + product.split(" ").at(-1) + id
} ///

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

//-----------1-------апдейт-------------------//

function clearProduct() {
    const productInput = document.getElementById('product');
    productInput.value = ''; // Очищаємо значення
    document.getElementById('productOptions').style.display = 'none'; // Ховаємо список
}

function toggleOptions(listId) {
    const optionsList = document.getElementById(listId);
    const currentDisplay = optionsList.style.display;

    // Перемикаємо видимість списку
    optionsList.style.display = currentDisplay === "none" ? "block" : "none";
}

function selectOption(inputId, value) {
    document.getElementById(inputId).value = value;
    document.getElementById(inputId + "Options").style.display = "none";
}

document.addEventListener("click", function (event) {
    const productOptions = document.getElementById("productOptions");

    if (!event.target.closest(".custom-select.select-product")) {
        productOptions.style.display = "none";
    }
});

document.getElementById('product').removeEventListener('input', filterOptions);

//-----------------2-------update--------------//

document.addEventListener("DOMContentLoaded", function () {
    fetch("data/materials.csv")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("Файл завантажено успішно.");
            return response.text();
        })
        .then(csvData => {
            console.log("Вміст CSV-файлу:", csvData);
            populateTable(csvData);
        })
        .catch(error => {
            console.error("Помилка завантаження CSV:", error);
        });
});

function populateTable(csvData) {
    const rows = csvData.trim().split("\n");
    const tableBody = document.getElementsByClassName("material-table-content")[0];
    tableBody.innerHTML = ""; // Очистити старі дані
    const material_classes = [""]



    rows.forEach(row => {
        const cols = row.split(",");
        const raw = document.createElement("div");
        raw.classList.add('material-table-content-row')



        let material_name = document.createElement("div")
        material_name.classList.add('material-name')
        material_name.textContent = cols[0].trim();
        raw.appendChild(material_name);



        let material_needed = document.createElement("div")
        material_needed.classList.add('material-needed')
        material_needed.textContent = cols[1].trim();
        if (parseInt(cols[1].trim()) > parseInt(cols[2].trim())) {
            material_needed.classList.add('material-lacking')
            const img = document.createElement("img")
            img.src = "img\\error.svg"
            material_needed.appendChild(img)
        }
        
        raw.appendChild(material_needed);



        let material_amount = document.createElement("div")
        material_name.classList.add('material-count')
        material_amount.textContent = cols[2].trim();
        raw.appendChild(material_amount);


        tableBody.appendChild(raw);
    });
}


