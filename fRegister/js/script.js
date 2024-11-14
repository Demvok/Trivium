document.addEventListener("DOMContentLoaded", () => {
    closeModal();
    closeModal2(); // Закрити форму при старті сторінки
});

function openModal() {
    resetForm(); // Очистити форму перед відкриттям
    document.getElementById("modalOverlay").style.display = "flex";
    showAllOptions(); // Показати всі опції в списках
}

function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
}

function submitOrder() {
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const factory = document.getElementById("factory").value;
    const date = document.getElementById("date").value;
    const comment = document.getElementById("comment").value;

    if (!product || !quantity || !factory) {
        alert("Будь ласка, заповніть всі обов'язкові поля.");
        return;
    }


    document.getElementById("orderNumber").textContent = "BIL" + Math.floor(Math.random() * 1000000000);
    document.getElementById("dateConfirm").value = date;
    document.getElementById("productConfirm").value = product;
    document.getElementById("quantityConfirm").value = quantity;
    document.getElementById("factoryConfirm").value = factory;
    document.getElementById("commentConfirm").value = comment;

    closeModal();
    openModal2();
}

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


function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function selectOption(inputId, value) {
    document.getElementById(inputId).value = value;
    document.getElementById(inputId + "Options").style.display = "none";
}

function resetForm() {
    document.getElementById("product").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("factory").value = "";
    document.getElementById("date").value = getTodayDate();
    document.getElementById("comment").value = "";
}

function showAllOptions() {
    document.getElementById("productOptions").style.display = "block";
    document.getElementById("factoryOptions").style.display = "block";
}


function openModal2() {
    document.getElementById("modalOverlay2").style.display = "flex";
}

function closeModal2() {
    document.getElementById("modalOverlay2").style.display = "none";
}

function editOrder() {
    document.getElementById("modalOverlay2").style.display = "none";
    document.getElementById("modalOverlay").style.display = "flex";
}

document.addEventListener("click", function (event) {
    const productOptions = document.getElementById("productOptions");
    const factoryOptions = document.getElementById("factoryOptions");

    if (!event.target.closest(".custom-select")) {
        productOptions.style.display = "none";
        factoryOptions.style.display = "none";
    }
});
