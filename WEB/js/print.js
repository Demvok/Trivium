let ORDER_INFO;
let PRODUCT_INFO;
let COILS_INFO;
let PARCEL_INFO;
let PARCEL_RUN_INFO;



const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
const parcel = urlParams.get('parcel');


async function getOrder1() {
    const orderId = new URLSearchParams(window.location.search).get('orderId'); // Отримуємо orderId з URL
    const response = await fetch('data/dimOrder.json');
    const data = await response.json();
    const orderDetails = data.find(item => item.order_code === orderId); // Вибірка за orderId

    if (orderDetails) {       

        return orderDetails;
    } else {
        console.error("Order not found");
    }
}


async function getFormat1(product) {
    const response = await fetch('data/technical_sheet.json');
    const data = await response.json();
    const productDetails = data.find(item => item.product_name === product);

    if (productDetails) {
        const coilCode = productDetails.ic_codes_for_coils;
        
        return productDetails
    } else {
        console.error("Product not found");
    }
}


async function getCoil1(coilCode) {
    
    
    const response = await fetch('data/data_coils.json');
    const data = await response.json();

    const coilDetails = data.filter(item => item["1C"] === coilCode );

    

    if (coilDetails.length > 0) {
        
        return coilDetails;
        
    } else {
        console.error("Coils not found");
    }
    
}


async function getParcel(order_code) {
    const response = await fetch('data/dimParcels.json');
    const data = await response.json();

    const parcelsDetails = data.find(item => item.fk_order_id === order_code && item.parcel_name == parcel);

    

    if (parcelsDetails) {
        
        return parcelsDetails;
        
    } else {
        console.error("Coils not found");
    }
    
}


async function getParcelRun(parcel) {
    const response = await fetch('data/factParcelRuns.json');
    const data = await response.json();

    const parcelsRunsDetails = data.filter(item => item.fk_parcel_id === parcel.parcel_id);

    

    if (parcelsRunsDetails) {
        
        return parcelsRunsDetails;
        
    } else {
        console.error("Coils not found");
    }
    
}


async function fetcData() {
    ORDER_INFO = await getOrder1();
    PRODUCT_INFO = await getFormat1(ORDER_INFO.product_name);
    COILS_INFO = await getCoil1(PRODUCT_INFO.ic_codes_for_coils);
    PARCEL_INFO = await getParcel(orderId);
    PARCEL_RUN_INFO = await getParcelRun(PARCEL_INFO);
    
  
}


document.addEventListener("DOMContentLoaded", async () => {
    await fetcData();
    populateFields();
});


function populateFields() {
    
    document.getElementById('order-number').value =  orderId;
    document.getElementById('characteristics1').value = PRODUCT_INFO.cutting_format_1c;
    document.getElementById('characteristics2').value =  PRODUCT_INFO.for_barcode;
    document.getElementById('cutting-code-1c').value = PRODUCT_INFO.cutting_code_1c;
    document.getElementById('leaf-nums').value = PRODUCT_INFO.qt_per_parcel;   
    const date = new Date(PARCEL_INFO["parcel_created_date"]);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    document.getElementById('date-cutting').value = formattedDate;
    document.getElementById('operator').value =  "admin";
    document.getElementById('coating-code').value = PRODUCT_INFO.varnishing_code_1c;
    document.getElementById('coating-format').value = PRODUCT_INFO.varnishing_type_1c;
    document.getElementById('pack').value = PARCEL_INFO.parcel_name;

    
    const sortedRuns = PARCEL_RUN_INFO.sort((a, b) => a.run_number - b.run_number);
    const row = document.querySelectorAll('tr')
    for (let index = 0; index < 4; index++) {

        const runs = row[index+1].querySelectorAll('td')
        const date = new Date(PARCEL_INFO.parcel_created_date);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        runs[0].innerText = formattedDate
        runs[1].innerText = index+1
        runs[2].innerText = PRODUCT_INFO[`varnishing_${index+1}`]
        runs[5].innerText = PRODUCT_INFO.qt_per_parcel
    }    

}