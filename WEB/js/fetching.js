let ORDER_INFO;
let PRODUCT_INFO;
let COILS_INFO;
let PARCEL_INFO;



async function fetchOrder(orderCode) {
    const response = await fetch(`api/orders/${orderCode}`);
    const data = await response.json();

    ORDER_INFO = data;
    
}

async function fetchProduct(productName) {
    const product_name = encodeURIComponent(productName)
    const response = await fetch(`api/product/${product_name}`);
    const data = await response.json();
    PRODUCT_INFO = data;    
}


async function fetchCoils(coilCode) {
    
    const response = await fetch(`api/coils/${coilCode}`);
    const data = await response.json();
    COILS_INFO = data;
}



async function fetchParcels(order_code) {
    
    const response = await fetch(`api/parcel/${order_code}`);
    const data = await response.json();
    
    PARCEL_INFO = data;
}