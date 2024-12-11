const express = require('express');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();

// Middleware to parse JSON data in requests
app.use(express.json());

// Serve static files from "WEB" directory
app.use(express.static(path.join(__dirname, 'WEB')));

// Endpoint to serve the home page
app.get('/', (req, res) => {
    console.log(path.join(__dirname, 'WEB', 'home.html'));
    
    res.sendFile(path.join(__dirname, 'WEB',  'home.html'));
});

// Path to your JSON file
const ordersJsonFilePath = path.join(__dirname, 'WEB', 'data', 'dimOrder.json');

// Function to read JSON data
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
};

// Function to write JSON data
const writeJsonFile = (data, jsonFilePath) => {
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('Data successfully written to the file!');
    } catch (err) {
        console.error('Error writing to the file:', err);
    }
};



// --------------------------------- ORDERS


// API endpoint to get all orders
// Endpoint to get an order by order_code
app.get('/api/orders/:order_code', (req, res) => {
    const orderCode = req.params.order_code; // Extract order_code from the request URL
    const orders = readJsonFile(ordersJsonFilePath); // Read the JSON file containing orders

    // Find the order with the matching order_code
    const order = orders.find(order => order.order_code === orderCode);

    if (order) {
        res.json(order); // Return the matching order
    } else {
        res.status(404).json({ message: "Order not found" }); // Return an error if not found
    }
});


app.get('/api/orders', (req, res) => {
    const orders = readJsonFile(ordersJsonFilePath);
    res.json(orders);
});



// API endpoint to add a new order
app.post('/api/orders', (req, res) => {
    const newOrder = req.body; // The new order data comes from the request body
    const orders = readJsonFile(ordersJsonFilePath);

    // Assign a new ID to the order
    newOrder.id = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;

    // Add the new order and save it
    orders.push(newOrder);
    writeJsonFile(orders, ordersJsonFilePath);

    res.status(201).json({ message: 'Order added successfully', order: newOrder });
});

app.put('/api/orders/:order_code', (req, res) => {
    console.log(1);
    
    const order_code = req.params.order_code; // Отримуємо ID із параметра URL
    const updatedOrder = req.body; // Нові дані для оновлення
    const orders = readJsonFile(ordersJsonFilePath);
    

    // Знаходимо замовлення за ID
    const order = orders.findIndex(order => order.order_code === order_code);
    

    
    if (order == -1) {
        
        updatedOrder.id = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;
        orders.push(updatedOrder);
    }
    else{
        updatedOrder.id = order;
        orders[order] = { ...orders[order], ...updatedOrder };
    }

    // Оновлюємо замовлення
    


    // Зберігаємо зміни в файл
    writeJsonFile(orders, ordersJsonFilePath);

    res.status(200).json({ message: 'Order updated successfully', order: order });
});



//---------------------------------------- Product

const productJsonFilePath = path.join(__dirname, 'WEB', 'data', 'technical_sheet.json');

app.get('/api/product/:product_name', (req, res) => {
    const product_name = decodeURIComponent(req.params.product_name); // Extract order_code from the request URL
    const products = readJsonFile(productJsonFilePath); // Read the JSON file containing orders

    // Find the order with the matching order_code
    const productDetails = products.find(product => product.product_name === product_name);

    if (productDetails) {
        res.json(productDetails); // Return the matching order
    } else {
        res.status(404).json({ message: "Order not found" }); // Return an error if not found
    }
});



//---------------------------------------- Coils

const coilsJsonFilePath = path.join(__dirname, 'WEB', 'data', 'data_coils.json');

app.get('/api/coils/:coil_code', (req, res) => {
    const coil_code = req.params.coil_code; // Extract order_code from the request URL
    const coils = readJsonFile(coilsJsonFilePath); // Read the JSON file containing orders

    // Find the order with the matching order_code
    const coilDetails = coils.filter(coil => coil["1C"] === coil_code);

    
    

    if (coilDetails) {
        res.json(coilDetails); // Return the matching order
    } else {
        res.status(404).json({ message: "Order not found" }); // Return an error if not found
    }
});


//---------------------------------------- Parcel

const parcelJsonFilePath = path.join(__dirname, 'WEB', 'data', 'dimParcels.json');

app.get('/api/parcel/:order_code', (req, res) => {
    const order_code = req.params.order_code; // Extract order_code from the request URL
    const parcels = readJsonFile(parcelJsonFilePath); // Read the JSON file containing orders
    

    // Find the order with the matching order_code
    const parcelDetails = parcels.filter(parcel => parcel.fk_order_id === order_code);
    
    
    

    if (parcelDetails) {
        res.json(parcelDetails); // Return the matching order
    } else {
        res.status(404).json({ message: "Order not found" }); // Return an error if not found
    }
});


// API endpoint to add a new order
app.post('/api/parcel', (req, res) => {
    const newOrder = req.body; // The new order data comes from the request body
    const parcels = readJsonFile(parcelJsonFilePath);

    // Assign a new ID to the order
    newOrder.parcel_id = parcels.length > 0 ? parcels[parcels.length - 1].parcel_id + 1 : 1;

    // Add the new order and save it
    parcels.push(newOrder);
    writeJsonFile(parcels, parcelJsonFilePath);

    res.status(201).json({ message: 'Order added successfully', order: newOrder });
});


app.put('/api/parcel/:parcel_name', (req, res) => {
    console.log(1);
    
    const parcel_name = req.params.parcel_name; // Отримуємо ID із параметра URL
    const updatedOrder = req.body; // Нові дані для оновлення
    const parcels = readJsonFile(parcelJsonFilePath);
    

    // Знаходимо замовлення за ID
    const parcel = parcels.findIndex(parcel => parcel.parcel_name === parcel_name);
    

    
    if (!parcel) {
        return res.status(404).json({ message: 'Order not found' });
    }

    // Оновлюємо замовлення
    parcels[parcel] = { ...parcels[parcel], ...updatedOrder };


    // Зберігаємо зміни в файл
    writeJsonFile(parcels, parcelJsonFilePath);

    res.status(200).json({ message: 'Order updated successfully', order: parcel });
});



// Start the server
// app.listen(8080, () => {
//     console.log('Server is listening on port 8080');

//     console.log(path.join(__dirname, 'home.html'))
// });

app.listen(3000,'0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.1:8080`);
  });