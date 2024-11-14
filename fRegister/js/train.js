document.addEventListener("DOMContentLoaded", () => {
    closeModal1();
    closeModal2();
    document.getElementById("date").value = new Date().toISOString().substring(0, 10);
});

function openModal1() {
    resetForm();
    document.getElementById("modalOverlay1").style.display = "flex";
}

function closeModal1() {
    document.getElementById("modalOverlay1").style.display = "none";
}

function openModal2() {
    document.getElementById("modalOverlay2").style.display = "flex";
}

function closeModal2() {
    document.getElementById("modalOverlay2").style.display = "none";
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

    closeModal1();
    openModal2();
}

function resetForm() {
    document.getElementById("product").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("factory").value = "";
    document.getElementById("date").value = new Date().toISOString().substring(0, 10);
    document.getElementById("comment").value = "";
}

function editOrder() {
    document.getElementById("modalOverlay2").style.display = "none";
    document.getElementById("modalOverlay1").style.display = "flex";
}
