//require
const TicketControl = require('../models/ticket-control');
//end require

//instanciamos la clase
const ticketControl = new TicketControl();


const socketController = (socket) => {
    
   /* console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });*/

    socket.on('next-ticket', ( payload, callback ) => {

        //creamos el envio del proximo ticket en cola, llamando a la clase TicketControl y usando el metodo siguiente
        const next = ticketControl.next();
        callback(next);
        console.log(payload);
        /*const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );*/

    })

}



module.exports = {
    socketController
}

