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

    //Apenas el cliente se conecte
    //Enviamos el ultimo ticket registrado 
    socket.emit('last-ticket', ticketControl.last);
    //Enviamos los ultimos 4 tickets pendientes 
    socket.emit('status', ticketControl.lastFour);
    //Enviamos los ultimos tickets pendientes 
    socket.emit('pendings', ticketControl.pendings.length);

    socket.on('next-ticket', ( payload, callback ) => {

        //creamos el envio del proximo ticket en cola, llamando a la clase TicketControl y usando el metodo siguiente
        const next = ticketControl.next();
        callback(next);
        //colocamos el broadcast de pendientes para que actualice al momento de crear un nuevo ticket
        socket.broadcast.emit('pendings', ticketControl.pendings.length);
        /*const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );*/

    });

    //recibimos el ticket que se atendera 
    socket.on('attend-ticket', (payload, callback ) => { // payload = desk
        //debemos verificar que el escritorio venga en el url
        if (!payload.desk){
            return callback({
                ok: false,
                msg: 'desk is required'
            });
        };
        //ahora llamamos a la funcion para atender ticket de nuestro ticketControl
        const ticket = ticketControl.attend(payload.desk);

        // se colocan estos eventos de nuevo aca para indicar que dispare el estado actual una vez se ejecute el evento de atender
        //Enviamos los ultimos 4 tickets pendientes 
        socket.broadcast.emit('status', ticketControl.lastFour);//en esta parte enviamos a todas las pantallas la informacion del status
        socket.emit('pendings', ticketControl.pendings.length);
        socket.broadcast.emit('pendings', ticketControl.pendings.length);
        //en caso de que sea null
        if (!ticket) {
            // statement
            callback({
                ok: false,
                msg: 'Not pending Ticket'
            });
        }else{
             callback({
                ok: true,
                ticket
            });
        }
    });

}



module.exports = {
    socketController
}

