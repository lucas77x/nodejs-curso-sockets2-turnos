// Comando para conectar con el servidor
var socket = io();

var searchParam = new URLSearchParams( window.location.search);

if(!searchParam.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio no está definido');
}

var escritorio = searchParam.get('escritorio');
var label = $('small');

console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function () {

    socket.emit('atenderTicket', { escritorio: escritorio }, function (respuesta) {

        console.log(respuesta);

        if (respuesta === 'No hay tickets'){
            alert(respuesta);
            label.text(respuesta);
            return;
        }


        label.text( "Ticket " + respuesta.numero );
    });
});

