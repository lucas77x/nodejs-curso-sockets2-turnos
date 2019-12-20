// Comando para conectar con el servidor
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Se conectó al servidor');
});

// escuchar
socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
});

$('button').on('click', function(){

    // Enviar informacion
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});

// Mostral el ticket actual
socket.on('ticketActual', function (respuesta) {
    
    label.text(respuesta.ultimo);
});

/*
// Escuchar informacion
socket.on('siguienteTicket', function (ticketNro) {

    console.log(ticketNro);
}); */

