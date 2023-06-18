//require
//end require

//variables
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCreateTicket = document.querySelector('#btnCreateTicket');
//end variables

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnCreateTicket.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCreateTicket.disabled = true;
});


/*socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})*/

//recibimos el ultimo ticket registrado y lo mostramos en pantalla
socket.on('last-ticket', (last)=>{
    lblNuevoTicket.innerText = 'ticket : ' + last;
});

//creamos un nuevo ticket y emitimos la orden de creacion
btnCreateTicket.addEventListener( 'click', () => {

    socket.emit( 'next-ticket', null, ( ticket ) => {
    	lblNuevoTicket.innerText = ticket;
    });

});