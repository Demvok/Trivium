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