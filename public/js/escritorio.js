//References HTML
const lbldesk = document.querySelector('h1'); // el primer elemento h1 que encuentre
const lblbtnAttend = document.querySelector('#btnAttend'); // el primer elemento h1 que encuentre
const labelTicket = document.querySelector('#labelTicket'); // 
const divAlert = document.querySelector('.alert'); // para ubicar una clase se coloca un . antes del nombre de la clase
const lblPendings = document.querySelector('#lblPendientes');

//utilizando esta funcion o metodo puedo leer los parametros que vienen en una URL de pagina web
const searchParams = new URLSearchParams( window.location.search);
//Para saber si existe el parametro escritorio
if (!searchParams.has('desk')) {
	// statement
	//retornamos al usuario al index
	window.location ='index.html';
	//enviamos el error
	throw new Error('The Desk is required');
} else {
	// statement
	//utilizamos la funcion get para saber si viene el escritorio y asignarlo a la const
	const desk = searchParams.get('desk');
	//ocultamos el alert
	divAlert.style.display = 'none';

//inicializamos el io
const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    lblbtnAttend.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    lblbtnAttend.disabled = true;
});


/*socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})*/

//recibimos el ultimo ticket registrado y lo mostramos en pantalla
socket.on('last-ticket', (last)=>{
    //lblNuevoTicket.innerText = 'ticket : ' + last;
});

//recibimos el ultimo ticket registrado y lo mostramos en pantalla
socket.on('pendings', (payload)=>{
    //lblNuevoTicket.innerText = 'ticket : ' + last;
    if (payload !== 0) {
    // statement
    	lblPendings.innerText = payload;
    }else{
    	return lblPendings.innerText = ``;
    }
});

//creamos un nuevo ticket y emitimos la orden de creacion
lblbtnAttend.addEventListener( 'click', () => {

	//creamos la variable del payload

	socket.emit('attend-ticket', { desk }, ({ok, msg, ticket}) => { // ticket a atender
		if (!ok){
			labelTicket.innerText = `Void`;
			return divAlert.style.display = '';
		}
		//mostramos el numero del ticket 
		labelTicket.innerText = `Ticket : ${ ticket.number }`;
	});

    /*socket.emit( 'next-ticket', null, ( ticket ) => {
    	lblNuevoTicket.innerText = ticket;
    });*/

});

}