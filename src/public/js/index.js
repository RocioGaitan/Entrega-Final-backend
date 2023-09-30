const socket = io();

const productList = document.getElementById('productList');

/*const chatText = document.querySelector("#show-text");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector("#chat-messages");

textInput.addEventListener('input', (e) => {
    socket.emit('message', textInput.value);
});

socket.on('connection', () => {
    console.log('connection establecida');
});

socket.on('updateProducts', (products) => {
    renderProduct(products);
    console.log('Productos actualizados', products);
});

socket.on('messageShow', data => {
    showText.textContent = data;
});

socket.on('chatMessages', data => {
    let chat = '';
    for(let item of data) {
        chat += `${item.socketId}: ${item.messagr} <br>`;
    }
    chatMessages.innerHTML = chat;
});

function send() {
    socket.emit('chatMessage', chatInput.value);
    chatInput.value = '';
}*/


socket.emit('message', 'hola desde un websocket');

socket.on('message', data=>{
    console.log(data);
})


socket.on('evento', data=>{
    console.log(data);
})
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



