const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Escucha al cliente
    client.on('siguienteTicket', (data, callback) => {
        
        let ticketNro = ticketControl.siguiente();        
        //console.log('Siguiente ticket: ' + ticketNro);

        callback(ticketNro);
    });

    // Emite ultimo nro
    client.emit('ticketActual', {
        ultimo: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // Escucha al cliente
    client.on('atenderTicket', (data, callback) => {

        if( !data.escritorio ) {
            return callback({
                ok: false,
                err: {
                    mensaje: "El escritorio es necesario"
                }
            });
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );

        callback(atenderTicket);

        // Emite ultimos4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
        
    });




});
