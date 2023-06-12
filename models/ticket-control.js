//require
const path = require('path');
const fs = require('fs');
//end require
//creamos clase ticket
class Ticket{
	constructor(number, desk){
		this.number = number;
		this.desk = desk;
	}
}
//creamos la clase
class TicketControl{
	//creamos el contructor de la clase que contendra los metodos a usar y las funcionalidades
	constructor(){
		//ultimo ticket en atender = 0
		this.last = 0;
		//fecha actual del ticket
		this.today = new Date().getDate();
		//tickets pendientes
		this.pendings = [];
		//ultimos 4 tickets
		this.lastFour = [];
		//iniciamos el metodo init
		this.init();
	}

	//creamos el getter el cual apuntara a los datos del constructor y permitira guardar estos datos en un formato json en la db json
	get toJson(){
        return {
        last: this.last,
		today: this.today,
		//tickets pendientes
		pendings: this.pendings,
		//ultimos 4 tickets
		lastFour: this.lastFour
        }
    }

    //iniciar la clase o servidor 
    init(){
    	//leer data directamente desde un json y automaticamente lo va a transformar en un objeto de js
    	//const data = require('../db/database');
    	//desestructuramos los datos
    	const { last, today, pendings, lastFour } = require('../db/database');
    	if (today === this.today) {
    		// statement
    		this.last = last;
    		this.pendings = pendings;
    		this.lastFour = lastFour;
    	}else{
    		this.saveJson();
    	}
    }

    //guardamos los datos en el archivo json
    saveJson(){
    	//construimos la ruta 
    	const dbpath = path.join(__dirname, '../db/database.json');
    	//usamos el writeFileSync para escribir, JSON.stringify para convertir en formato json, this.toJson para enviarle el get objeto
    	fs.writeFileSync(dbpath, JSON.stringify(this.toJson))
    }

    next(){
    	//creamos un acumulador para la cola de los ticket
    	this.last += 1;
    	//instanciamos la nueva clase y le enviamos el ultimo ticket y null, null significa que nadie esta trabajando ese ticket
    	const ticket = new Ticket(this.last, null);
    	//con push insertamos el ticket en pendientes
    	this.pendings.push(ticket);
    	//guardamos en el json
    	this.saveJson();
    	//retornamos el ultimo
    	return 'ticket : ' + ticket.number;
    }

    attend(desk){
    	//no tenemos tickets
    	if(this.pendings.length === 0){
    		return null;
    	}
    	//si hay creamos una const para extraer el ticket de la primera posicion
    	//const ticket = this.pendings[0]; 
    	const ticket = this.pendings.shift();
    	//borramos el primer elemento de la lista y lo retornamos, para borrar el ticket que se atiende o ya se atendio
    	//this.pendings.shift(); // se puede hacer directo como const ticket = this.pendings.shift
    	ticket.desk = desk;
    	//anadir al principio de la cola
    	this.lastFour.unshift(ticket);//unshift anade un elemento nuevo al arreglo pero al inicio
    	if (this.lastFour.length > 4) {
    		// statement
    		//splice nos sirve para borrar un elemento del arreglo, comenzamos en el ultimo elemento y solo borramos 1
    		this.lastFour.splice(-1, 1);
    	}
    	//guardamos en la db
    	this.saveJson();
    	//retornamos el ticket
    	return ticket;
    }
}

//exports
module.exports = TicketControl;