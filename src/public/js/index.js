const socket = io();

const productList = document.getElementById('productList');



socket.on('connection', () => {
    console.log('connection establecida');
});

socket.on('updateProducts', (products) => {
    renderProduct(products);
    console.log('Productos actualizados', products);
});



function renderProduct(products) {
    productList.innerHTML = '';
    products.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - ${product.code} - ${product.price} - ${product.stock}`;
        productList.appendChild(li);
        
    });
}



