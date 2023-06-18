//Query Selectors
const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');
//end querySelectors

//inicializamos el io
const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    //btnCreateTicket.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    //btnCreateTicket.disabled = true;
});


/*socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})*/

//recibimos el ultimo ticket registrado y lo mostramos en pantalla
socket.on('status', (payload)=>{

	//haremos que se active un sonido cuando atendamos un ticket
	var audio = new Audio('./audio/new-ticket.mp3');
	audio.play(); // Audio es una clase de JS que me permite reproducir audios

	const [ ticket1, ticket2, ticket3, ticket4 ] = payload;
	if(ticket1){
	//tkt1
	lblTicket1.innerText = 'Ticket ' + ticket1.number;
	lblEscritorio1.innerText = 'Desk ' + ticket1.desk;
	};
	if(ticket2){
	//tkt1
	lblTicket2.innerText = 'Ticket ' + ticket2.number;
	lblEscritorio2.innerText = 'Desk ' + ticket2.desk;
	};
	if(ticket3){
	//tkt1
	lblTicket3.innerText = 'Ticket ' + ticket3.number;
	lblEscritorio3.innerText = 'Desk ' + ticket3.desk;
	};
	if(ticket4){
	//tkt1
	lblTicket4.innerText = 'Ticket ' + ticket4.number;
	lblEscritorio4.innerText = 'Desk ' + ticket4.desk;
	};
});