

//Додавання списку продуктів ..................................................................................................




function CommentAutoResize() {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach(textarea => {
        // Якщо textarea вже має текст, одразу адаптуємо висоту
        autoResize(textarea);

        // Додаємо обробник подій input для автоматичної зміни висоти
        textarea.addEventListener("input", function() {
        autoResize(textarea);
        });
    }); // редагування розміру коментаря
}




function ProductListLoader() {
    const productInput = document.getElementById('product');
    const productOptions = document.getElementById('productOptions');
    let productList = []; // Масив для збереження продуктів з файлу

    // Завантаження даних із текстового файлу
    fetch('./data/product.txt')
        .then(response => response.text())
        .then(data => {


            // Розділяємо дані на рядки та видаляємо дублікат
            const lines = data.trim().split('\n');
            productList = Array.from(new Set(lines.map(line => line.trim()))); // Унікальні продукти


            // Додаємо кожен продукт у випадаючий список
            productList.forEach(productName => {


                const option = document.createElement('div');
                option.textContent = productName;
                option.onclick = () => {                                                
                    productInput.value = productName;
                    productOptions.style.display = 'none';


                    // Перевірка введеного значення на відповідність продуктам у списку
                    const inputValue = productInput.value.trim();
                    if (inputValue && !productList.includes(inputValue)) {
                        alert("Такого продукту немає");
                        productInput.value = ''; // Очистити поле
                    }
                };
                productOptions.appendChild(option);

            });
        });
}


function FactoryListLoader() {
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
                    

                    // Перевіряємо, чи існує введене значення у списку заводів
                    const inputValue = factoryInput.value.trim();
                    const factoryExists = factories.some(factory => factory.name.toLowerCase() === inputValue.toLowerCase());
                    if (!factoryExists && inputValue !== '') {
                        alert("Такого заводу немає");
                    }
                }


                factoryOptions.appendChild(option);

            });
        }); 
}



function fillMaterialTable() {
    fetch("data/materials.csv")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(csvData => {
        const rows = csvData.trim().split("\n");
        const tableBody = document.getElementsByClassName("material-table-content")[0];
        tableBody.innerHTML = ""; // Очистити старі дані

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
                img.alt = "Нестача"
                img.title = "Даного матеріалу не вистачає на складі"
                material_needed.appendChild(img)
            }
            
            raw.appendChild(material_needed);

            let material_amount = document.createElement("div")
            material_name.classList.add('material-count')
            material_amount.textContent = cols[2].trim();
            raw.appendChild(material_amount);

            tableBody.appendChild(raw);
        });
    })
    .catch(error => {
        console.error("Помилка завантаження CSV:", error);
    }); 
}