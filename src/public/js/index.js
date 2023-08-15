/*instanciar el socket y guardarlo en la const*/
const socket = io();

socket.emit('message', 'hola desde un websocket');

socket.on('message', data=>{
    console.log(data);
})


socket.on('evento', data=>{
    console.log(data);
})



