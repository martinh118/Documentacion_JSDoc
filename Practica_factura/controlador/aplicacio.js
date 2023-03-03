/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description 
 */

// Importa la clase Factura de /model/Factura.js.
import {Factura} from "../model/Factura.js";
// Importa la clase Article de /model/Factura.js.
import {Article} from "../model/Article.js";
//Importa totes les funcions de calcul.
import * as calcul from './calculs.js';
//Importa totes les funcions de comp.
import * as comp from './comprovacions.js';
//Importa totes les funcions de tec.
import * as tec from './teclat.js';

//Constant "gracies" amb etiqueta <div> amb missatge de "MOLTES GRACIES!".
const gracies = "<div class='especial'>MOLTES GRÀCIES!</div>";
//Variable de llista "arrayFactures".
let arrayFactures = [];

/**
 * @method amagar() Guarda les referències d'article i factura de l'arxiu HTML "Factura.html" a la variable "element" i els amaga. 
 * Això fa que les finestres de crear Article o crear Factura es deixin de mostrar.
 * 
 */
function amagar() {
	//Guarda la referència des del primer punt de l'etiqueta <div> html amb l'identificador "articles"
	let element = $('#articles').get(0);
	//Executa .setAttribute a la variable "element" per amagar la "finestra" ("hidden", true).
	element.setAttribute("hidden", true);
	//Amb la referència directe HTML amb l'identificador "taulaArticles" canvia l'etiqueta <tbody> a un String buit (.html("")).
	$("#taulaArticles tbody").html("");

	//Guarda la referència des del primer punt de l'etiqueta <div> html amb l'identificador "factura".
	element = $('#factura').get(0);
	//Executa .setAttribute a la variable "element" per amagar la "finestra" ("hidden", true).
	element.setAttribute("hidden", true);
}

/**
 * @method generarData() Prepara cada camp de la finestra a l'hora de crear una factura i omple automàticament els camps de "Núm. Factura" i "Data de factura".  
 * 
 * 
 */
function generarData() {
	//Guarda a la variable "id" l'identificador de l'última factura guardat a l'array "arrayFacures".
	let id = arrayFactures[arrayFactures.length - 1].getId() + 1;
	//Guarda a la variable "index" la posició on està ubicada l'identificador amb el mateix número de la variable "id".
	let index = arrayFactures.findIndex(factura => factura.id == id);
	//Executa la funció focus() apuntant a l'etiqueta HTML amb l'identificador "nif".
	$('#nif').focus();

	//En cas de que el valor de "index" sigui igual a -1...
	if(index == -1) {
		//Guarda a la variable "now" un now objecte de tipus Date.
		let now = new Date();

		// Guarda a la variable "day" el número que correspon al dia de la data.
		let day = ("0" + now.getDate()).slice(-2);
		// Guarda a la variable "month" el número que correspon al mes de la data.
		let month = ("0" + (now.getMonth() + 1)).slice(-2);

		// Guarda a la variable "today" la data completa amb el format YYYY-MM-DD.
		let today = now.getFullYear()+"-"+(month)+"-"+(day) ;

		//Agafa l'etiqueta HTML amb l'identificador "numFactura" i aplica el valor de la variable "id".
		$('#numFactura').val(id);
		//Agafa l'etiqueta HTML amb l'identificador "data" i aplica el valor de la variable "today".
		$('#data').val(today);
		//A cada etiqueta HTML que agafa amb el seu identificador els hi deixa en blanc.
		$('#nif').val('');
		$('#nom').val('');
		$('#adreca').val('');
		$('#correu').val('');
		$('#pagat').val('');
		$('#iva').val('');
	}
}

/**
 * @method eventListeners() A partir de l'identificador HTML executa la funció de cada botó quan és premut.
 * 
 */
function eventListeners() {
	//A partir de l'etiqueta HTML amb l'identificador "guardarArticles" i guarda els articles en la factura escollida (Botó "Guardar" situat a la finestra dels Articles d'una factura).
	$("#guardarArticles").click(guardarArticle);
	//A partir de l'etiqueta HTML amb l'identificador "afegirArticle" afegeix una nova cel·la per omplir amb un nou article (Botó "+" situat a la finestra dels Articles d'una factura).
	$("#afegirArticle").click(afegirCella);
	//A partir de l'etiqueta HTML amb l'identificador "tancar" amaga la finestra on mostra les opcions per crear una factura (Botó "x" situat a la finestra on es crea una factura).
	$("#tancar").on("click", amagar);
	//A partir de l'etiqueta HTML amb l'identificador "tancar2" amaga la finestra on es mostra l'article/s d'una factura (Botó "x" situat a la finestra dels Articles d'una factura).
	$("#tancar2").on("click", amagar);
	//A partir de l'etiqueta HTML amb l'identificador "guardar" guarda un fitxer amb tota la informació sobre les factures i els articles corresponents (Botó "Guardar" situat a la pàgina principal de Factures.html).
	$("#guardar").on("click", guardar);
	//A partir de l'etiqueta HTML amb l'identificador "apuntar" mostra la finestra amb els camps per crear una factura (Botó "Nova factura" situat a la pàgina principal de Factures.html).
	$('#apuntar').click(openDialegNewFactura);
	//A partir de l'etiqueta HTML amb l'identificador "nif" comprova que el NIF sigui correcte.
	$('#nif').change(comp.validarFactura);
	//A partir de l'etiqueta HTML amb l'identificador "nom" comprova que el nom sigui correcte.
	$('#nom').on("input", comp.validarFactura);
	//A partir de l'etiqueta HTML amb l'identificador "adreca" comprova que l'adreça sigui correcte.
	$('#adreca').on("input", comp.validarFactura);
	//A partir de l'etiqueta HTML amb l'identificador "correu" comprova que el correu electrònic sigui correcte.
	$('#correu').change(comp.validarFactura);
	//A partir de l'etiqueta HTML amb l'identificador "submitFactura" comprova que totes les dades a l'hora de crear una factura siguin les correctes (Botó "Acceptar" situat a la finestra on es crea una factura). 
	$('#submitFactura').click(function (event) {
		event.preventDefault();
		if(!guardarFactura(arrayFactures)){ 
			mostrarError("ERROR en la concordança de les dades.");
		} else {
			amagar();
		}
	});
	$('button[type=reset]').click(amagar);
}

/**
 * @method afegirCella() A la finestra dels Articles d'una factura afegeix una fila amb tots els camps buits.
 * Això es fa aplicant una taula a partir de codi HTML.
 * 
 */
function afegirCella() {
	//Guarda la referència de l'identificador HTML "taulaArticles" i les etiquetes "tbody td" a la variable "rows".
	let rows = $("#taulaArticles tbody tr");	
	// Aplica la fila amb l'identificador de la fila corresponent a partir de la longitud de "rows" i les classes de cada secció de la taula.
	$("#taulaArticles tbody").append("<tr id=\"rowArticle"+ rows.length +"\"><td>&nbsp</td><td>&nbsp</td><td class=\"unitats\">&nbsp</td><td class=\"preu\">&nbsp</td><td>&nbsp</td></tr>");
	//A partir de les etiquetes i l'identificador HTML "tbody td" i "taulaArticles" permet que el contingut sigui editable per l'usuari.
	$('#taulaArticles tbody td').attr('contenteditable', true);

	//A partir de les classes aplicades a la fila anterior agafa el preu i les unitats aplicats a l'article i fa el càlcul subtotal de tots els articles per afegir a l'última fila de "Total". 
	$('.preu').on("focusout",calcul.calcularSubtotal);
	$('.unitats').on("focusout",calcul.calcularSubtotal);
}

/**
 * @method guardarArticle() A partir de l'array creat al principi del codi ("arrayFactures") guarda els nous articles 
 * creats a aquesta llista amb totes les seves propietats i l'identificador corresponent depenent de la posició.
 * 
 */
function guardarArticle() {
	//Guarda a la variable "facturaId" l'identificador corresponent de la factura on es guardarà l'article/s.
	let facturaId = $("#facturaId").get(0).value;
	//A partir de l'identificador de la factura corresponent es guarda a la variable "index" el número d'identificador per saber a quina posició guardar la llista d'articles.
	let index = arrayFactures.findIndex(f => { return f.getId() == facturaId; });
	//En la posició del valor de "index" guardarà a la llista "arrayFactures" l'array corresponent a la classe.
	arrayFactures[index].setArrayArticles([]);
	//Guarda a la variable "rows" la referència de l'identificador HTML "taulaArticles" i les etiquetes "tbody" i "tr".
	let rows = $('#taulaArticles tbody tr');
	
	//A partir del bucle for es guarda cada dada aplicada per l'usuari de cada article a una variable individual 
	//i s'aplica a l'array de la classe factura seleccionat.
    for (let i = 0; i < rows.length; i++) {
		//De la referència HTML guarda a la variable "rows" es guarda cada camp amb l'opció "children" i es guarda la dada aplicada per l'usuari a les variables corresponents.
		let codiArticle = rows[i].children[0].textContent.trim();
		let nomArticle = rows[i].children[1].textContent.trim();
		let unitats = rows[i].children[2].textContent.trim();
		let preu = rows[i].children[3].textContent.trim();
		let subtotal = rows[i].children[4].textContent.trim();

		//A partir del bucle for s'aplica a l'array de la classe factura amb l'identificador corresponent les dades dels articles creats. Això es fa a partir d'una funció creada a la classe "Factura".
		for (let factura of arrayFactures) {
			if(factura.getId() == facturaId) {
				factura.afegirArticle(codiArticle, nomArticle, unitats, preu, subtotal);
			}
		}
	}
	//Fora de la vista humana mostra la finestra de factures i l'amaga.
	mostrarFactures();
	amagar();
}

/**
 * @method guardarFactura() A partir dels identificadors HTML de la finestra de "Nova factura", guarda els valors de cada camp input de la finestra a cada variable corresponent i fa les comprovacions necessàries.
 * A partir d'aquí crea un nou objecte de factura, el guarda a la llista "arrayFactures" i el mostra a la pàgina.
 *
 * @returns boolean, en cas que cada comprovació de crear la factura sigui correcte retorna "true".
 */
function guardarFactura() {
	//Agafa la referència de cada valor aplicat per l'usuari en la finestra de "Nova factura" i el guarda als variables corresponents.
	let id = $('#numFactura').val();
	let data = $('#data').val();
	let nif = $('#nif').val();
	let nomClient = $('#nom').val();
	let adreca = $('#adreca').val();
	let correu = $('#correu').val();
	let pagat = $('#pagat').attr('checked');
	console.log($('#pagat').val());
	console.log($('#pagat').attr('checked'))
	let iva = $('#iva').val();
	let total = $('#total').text();

	//Mostra el total a la consola del navegador.
	console.log(total);

	//Amb les funcions de la classe "comprovacions" executa els metodes necessaris per comprobar que els valors de les variables importants siguin correctes.
	//En cas de que siguin incorrectes retorna false.
	if(!comp.comprovarNIF(nif)) {
		return false;
	}
	if(!comp.comprovarNom(nomClient)) {
		return false;
	}
	if(!comp.comprovarCorreu(correu)) {
		return false;
	}
	if(adreca == "" || adreca == undefined) {
		return false;
	}
	if(pagat) pagat = "SI"; else pagat = "NO";
	console.log(pagat);

	//A partir de l'identificador de la factura corresponent es guarda a la variable "index" el número d'identificador per saber si la factura ha sigut creada o fa falta crear una nova.
	let index = arrayFactures.findIndex(factura => factura.getId() == id);

	//En cas que el valor de "index" sigui igual a -1, es crea un nou objecte Factura amb les dades guardades anteriorment i es guarda a l'array "arrayFactures", seguidament es mostra la nova factura la pàgina principal.
	//I retorna true.
	if(index == -1) {
		let factura = new Factura(id, data, nif, nomClient, adreca, correu, pagat, iva, total);
		arrayFactures.push(factura);
		mostrarFactures();
		$('#pagat').attr('checked', false);
		return true;
	}
	//En cas contrari es modifica la factura amb l'identificador guardat a "index". 
	//I retorna true.
	else {
		modificarFactura(id, data, nif, nomClient, adreca, correu, pagat, iva, total);
		$('#pagat').attr('checked', false);
		return true;
	}
	
}

/**
 * @method mostrarFactures() Afegeix a la taula principal HTML l'informació de les factures guardades.
 */
function mostrarFactures() {
	//Crea la variable String.
	let registre = "";

	//Fa el càlcul del preu total dels articles guardats a cada factura, això es fa a partir de la classe càlcul.
	calcul.totalFactura(arrayFactures);

	//A partir d'un bucle for agafa cada objecte "factura" guardat a la llista "arrayFactures" i aplica l'informació dins la variable "registre".
	for (let factura of arrayFactures) {
		registre += "<tr id='" + factura.getId() + "'>";
		registre += factura.imprimirFactura();
		registre += "</tr>";
	}
	//Agafa directament la referència HTML de la taula amb l'identificador "factures" i aplica tot el valor de la variable String "registre".
	$("#factures tbody").html(registre);
	//Finalment, aplica els botons d'acció de cada factura.
	accions();
}

/**
 * @method mostrarArticles() A partir del paràmetre d'entrada en número, mostra els articles guardats de la factura corresponent posicionada a la llista "arrayFactures". 
 * @param {Number} ndx Posició on es guarda la factura seleccionada per l'usuari.
 */
function mostrarArticles(ndx) {
	//Es guarda a la variable "index" el número identificador de la factura seleccionada per l'usuari i a la vegada per la màquina.
	let index = arrayFactures.findIndex(f => { return f.getId() == ndx; });
	//Es guarda a la variable "registre" el valor String amb tota la informació dels articles guardats a aquesta factura. És a dir, la taula.
	//Això es fa a partir de la classe "Factura".
	let registre = arrayFactures[index].imprimirArticles();

	//S'aplica a la taula HTML amb l'identificador "taulaArticles" l'String guardat a la variable "registre".
	$("#taulaArticles tbody").html(registre);
	//Deixa que la taula sigui editable per modificar els camps dels articles.
	$('#taulaArticles tbody td').attr('contenteditable', true);

	//Amb la referencia HTML de la classe "preu" calcula el subtotal.
	$('.preu').on("focusout",calcul.calcularSubtotal);
	//Amb la referencia HTML de la classe "unitats" calcula el subtotal.
	$('.unitats').on("focusout",calcul.calcularSubtotal);

	//Aplica l'opció de esborrar l'article.
	$('.delArticle').click(borrarArticle);
	//Finalment, aplica automàticament el total de tots els articles.
	calcul.totalArticle();
};

/**
 * @method accions() Per a cada fila de factura en la taula principal, afegeix les accions disponibles a partir de l'objecte "factura" i els mètodes corresponents.
 */
function accions() {
	//Amb el bucle for agafa l'identificador de cada objecte "factura" guardat a la llista "arrayFactures" i els hi aplica els botons amb la referència HTML corresponent.
	for (let factura of arrayFactures) {
		$('#edit' + factura.getId()).click(editFactura);
		$('#delete' + factura.getId()).click(eliminarFactura);
		$('#articles' + factura.getId()).click(openDialegEditArticles);
		$('#print' + factura.getId()).click(printFactura);
	}
}

/**
 * @method agafarId() Agafa l'identificador de la factura desitjada a partir del número de la variable "id".
 * @param {Number} id Identificador de la factura.
 * @param {Number} num Número a partir del qual comença la recerca de la subcadena.
 * @returns Retorna la subcadena de l'identificador a partir dels paràmetre introduïts. 
 */
function agafarId(id , num) {
	return id.substring(num)
}

/**
 * @method editFactura() Agafa cada element guardat de l'objecte ja creat "Factura" seleccionat per l'usuari i el mostra a la finestra de "Nova factura" amb tots els camps ja omplerts.
 * @param {Event} event Aquesta variable és la referència sobre l'esdeveniment seleccionat als botons disponibles.
 */
function editFactura(event) {
	//A partir del mètode "agafarId" i el paràmetre d'entrada "event", es guarda l'identificador de la factura seleccionada per l'usuari a la variable "elementId". 
	let elementId = agafarId(event.currentTarget.id, 4);
	// Amb una funció anònima guarda la referència de l'objecte "Factura" seleccionat a partir del valor "elementId", és a dir, el valor de la variable "factura" apunta a la factura guardada a la llista "arrayFactures".
	let factura = arrayFactures.find(f => { return f.getId() == elementId; });
	//A partir del valor de la variable "factura" i la referència HTML adequada, s'omple directament cada camp de la finestra "Nova factura" amb els Getters de l'objecte.  
	$('#numFactura').val(factura.getId());
	$('#data').val(factura.getData());
	$('#nif').val(factura.getNif());
	$('#nom').val(factura.getNomClient());
	$('#adreca').val(factura.getAdreca());
	$('#correu').val(factura.getCorreu());
	$('#pagat').attr('checked', factura.getPagat() == "SI" ? true : false);
	$('#iva').val(factura.getIva());
	$('#total').text(factura.getTotal());
	let element = $('#factura').get(0);
	element.hidden = false;
	//Sempre que s'obre aquesta finestra, es seleccionarà per editar el camp "NIF client".
	$('#nif').focus();
}

/**
 * @method modificarFactura() En cas que una factura ha sigut modificada, aquesta funció crea un objecte "Factura" nou amb tots els camps, 
 * i el substitueix amb l'objecte en la mateixa posició on està situat la factura modificada en la llista "arrayFactures". 
 * @param {Number} id Identificador de la factura modificada.
 * @param {Date} data Data de la factura modificada.
 * @param {String} nif NIF del client de la factura modificada.
 * @param {String} nom Nom del client de la factura modificada.
 * @param {String} adreca Adreça de la factura modificada.
 * @param {String} correu Correu electrònic del client de la factura modificada.
 * @param {Boolean} pagat Valor check de la factura modificada.
 * @param {Number} iva Percentatge de l'iva de la factura modificada.
 * @param {Number} total Valor total dels articles de la factura modificada.
 */
function modificarFactura(id, data, nif, nom, adreca, correu, pagat, iva, total) {
	//Guarda a la variable "index" el número de la posició de la factura en la llista "arrayFactures" amb el mateix identificador que el paràmetre d'entrada "id".
	let index = arrayFactures.findIndex(f => { return f.getId() == id; });
	//Crea un nou objecte "Factura" amb tots els valors de cada paràmetre d'entrada i el guarda a la variable "factura".
	let factura = new Factura(id, data, nif, nom, adreca, correu, pagat, iva, total);
	//Substitueix la factura guardada a la variable "factura" amb la factura posicionada al valor d'"index" de la llista "arrayFactures".
	arrayFactures[index] = factura;
	//Finalment, mostra els canvis a la taula principal de "Factures.html".
	mostrarFactures();
}

/**
 * @method eliminarFactura() Mostra un missatge perquè l'usuari s'asseguri si vol eliminar la factura.
 * En cas positiu agafa la referència de la factura amb l'identificador adequat i l'elimina de la llista "arrayFactures"
 * @param {Event} event Aquesta variable és la referència sobre l'esdeveniment seleccionat als botons disponibles.
 */
function eliminarFactura(event) {
	//Primerament, mostra el missatge a l'usuari si de veritat vol eliminar la factura.
	if(confirm("Estas segur que vols eliminar aquesta factura?")) {
		//En cas que la resposta sigui "true", guarda l'identificador de la factura amb el mètode "agafarId" i el guarda a la variable "elementId".
		let elementId = agafarId(event.currentTarget.id, 6);
		//I amb el metode "splice" i "findIndex" elimina l'objecte "Factura" de la llista "arrayFactures".
		arrayFactures.splice(arrayFactures.findIndex(f => { return f.getId() == elementId; }), 1);
		//Un cop fet, actualitza la taula principal amb el metode "mostrarFactures".
		mostrarFactures();
	}
}

/**
 * @method borrarArticle() A partir de l'identificador de la factura i de l'article esborra l'article seleccionat de la taula d'articles de la factura.
 * @param {Event} event Aquesta variable és la referència sobre l'esdeveniment seleccionat als botons disponibles.
 */
function borrarArticle(event) {
	//Guarda a la variable "facturaId" el número d'identificador de la factura seleccionada. 
	let facturaId = $("#facturaId").get(0).value;
	//Guarda el número de posició de la factura seleccionada en la llista "arrayFactures" a la variable "index".
	let index = arrayFactures.findIndex(f => { return f.getId() == facturaId; });
	//Guarda una referència de l'objecte "Factura" a la variable "factura". Es a dir, apunta a la factura seleccionada.
	let factura = arrayFactures[index];
	//Guarda la fila completa de l'article on ocorre l'esdeveniment a la variable "row".
	let row = event.currentTarget.parentElement.parentElement;

	//Guarda el número de codi de l'article on es fa l'esdeveniment a la variable "codiArticle".
	let codiArticle = row.children[0].textContent.trim();
	//A partir de la referència de la factura seleccionada a "factura", es guarda la llista d'Articles de la factura a la variable "arrayArticles".
	let arrayArticles = factura.getArrayArticles();
	//Amb la funció "splice" elimina l'article desitjat a la llista "arrayArticles".
	arrayArticles.splice(arrayArticles.findIndex(a => { return a.getCodi() == codiArticle; }), 1);
	//Amb la llista "arrayArticles" modificat, actualitza la llista d'articles a la factura. 
	factura.setArrayArticles(arrayArticles);
	//Finalment, torna a mostrar la taula d'articles de la factura.
	mostrarArticles(facturaId);
}

/**
 * @method mostrarError() Mostra un missatge d'error a la taula principal de factures.
 * @param {String} text text que es mostra a la taula d'articles.
 */
function mostrarError(text) {
	$('#error').text(text);
}

/**
 * @method openDialegNewFactura() Mostra la finestra completa per crear un objecte "Factura".
 */
function openDialegNewFactura() {
	//Guarda la referència de l'etiqueta HTML amb l'id "factura" a la variable "element"...
	let element = $('#factura').get(0);
	//Canvia el valor "hidden" (amagar) com a "false"...
	element.hidden = false;
	//I prepara tots els camps per omplir.
	generarData();
}

/**
 * @method openDialegEditFactura() A partir de l'identificador de la factura seleccionada, agafa la factura i mostra la informació de la factura a la finestra "Factura.html".
 * @param {Event} event Aquesta variable és la referència sobre l'esdeveniment seleccionat als botons disponibles.
 */
function openDialegEditArticles(event) {
	//Guarda a la variable "id" el número d'identificador de la factura seleccionada.
	let id = agafarId(event.currentTarget.id,8);
	//en el input "facturaId" guarda el valor de la id de la factura seleccionada.
	$("#facturaId").get(0).value = id;
	//mostra la taula d'articles de la factura seleccionada.
	mostrarArticles(id);
	//Guarda la referència de l'etiqueta HTML amb l'id "articles" a la variable "element"...
	let element = $('#articles').get(0);
	//Canvia el valor "hidden" (amagat) com a "false"...
	element.hidden = false;
	
}

/**
 * @method printFactura() A partir de l'identificador de la factura seleccionada, agafa la factura i mostra la informació de la factura a la finestra "Print.html".
 * @param {Event} event Aquesta variable és la referència sobre l'esdeveniment seleccionat als botons disponibles.
 */
function printFactura(event) {
	//elementId es el id de la factura
	let elementId = event.currentTarget.id.substring(5);
	//agafa la factura amb el id de la factura
	let factura = arrayFactures.find(f => { return f.getId() == elementId; });
	let tr = $('#' + elementId);
	let preuFinal = 0;
	//agafa els articles de la factura
	let arrayArticles = factura.getArrayArticles();

		for (const article of arrayArticles) {
			preuFinal += article.getSubtotal();
		}

	let importIVA = parseFloat(preuFinal * factura.getIva() / 100);

	// crear la ruta per obrir la finestra amb totes les dades de la factura
	let ruta = "../vista/Print.html?nif=" + factura.getNif() + 
	"&data=" + factura.getData() + "&id=" + factura.getId() + "&totalfinal=" +  factura.getTotal()
	+ "&iva=" + factura.getIva() + "&pagat=" + factura.getPagat() + "&nom=" + factura.getNomClient() + 
	"&adreca=" + factura.getAdreca() + "&correu=" + factura.getCorreu() + "&importIVA=" + importIVA +
	"&articles=";
	
	
	for(let article of factura.getArrayArticles()) {
		ruta += article.getCodi() + "," + article.getNom() + "," + article.getUnitat() +
		"," + article.getPreu() + "," + article.getSubtotal() + ";";
	}
	ruta += "&totalarticle=" +  preuFinal;
	
	//obrir la finestra
	window.open(ruta, '_blank', 'height=600,width=800');
}

/**
 * @method guardar guarda les dades de les factures a un arxiu de .tsv
 * 
 */
function guardar() {
	let text = "";
	//cada factura es guarda en una fila
	for(let factura of arrayFactures) {
		text += factura.getId() + "\t " + factura.getData() + "\t" + factura.getNif() + "\t" + factura.getNomClient() + "\t" 
		+ factura.getAdreca() + "\t" + factura.getCorreu() + "\t" +  factura.getPagat() + "\t" + factura.getIva() + "\t" + factura.getTotal() + "\n";
		for(let article of factura.getArrayArticles()) {
			text += "\t" + article.getCodi() + "\t" + article.getNom() + "\t" + article.getUnitat() + "\t" + article.getPreu() + "\t" + article.getSubtotal() + "\n";
		}
	}
	//nom de l'arxiu
	let nom = new Date().toUTCString();
	//descarrega l'arxiu
	downloadArxiu(nom + ".tsv", text);
}

/**
 * @method downloadArxiu Descarrega un arxiu de text/tsv.
 * @param {String} filename nom del arxiu.
 * @param {String} text text del arxiu.
 */
function downloadArxiu(filename, text) {
	//Crea un objecte similar a un arxiu format per bytes i el guarda a la constant "file".
	const file = new Blob([text], {type: 'text/tsv'});
	//Crea un link "fantasma" i el guarda a la constant "a".
    const a = document.createElement('a');
	// Crear una URL que representa l'arxiu a descarregar
    a.href = URL.createObjectURL(file);
	// Indicar el nom de l'arxiu que es descarregarà
    a.download = filename;
	// Simula un clic sobre l'enllaç
    a.click();
	// Eliminar el link "fantasma"
    URL.revokeObjectURL(a.href);
}

/**
 * @method carregarFactures Carrega les dades de les factures d'un arxiu de .tsv.
 * @param {Event} evt Aquesta variable és la referència sobre l'esdeveniment seleccionat als botons disponibles.
 * @returns void.
 */
function carregarFactures(evt) {
	//Es guarda a la variable "file" l'array amb les dades de l'arxiu/s seleccionat.
	let file = evt.target.files;
	//Es crea l'objecte per llegir arxius.
	let reader = new FileReader();
	//A partir del nom de l'arxiu, guarda un array a la variable "nom" amb el nom de l'arxiu i el tipus d'arxiu. 
	let nom = file[0].name.split(".");

	//Si el tipus d'arxiu guardat com a caràcters en la variable "nom" no és igual a "tsv", mostra l'"alert" i fa un "return".
	if(nom[1] != "tsv") {
		alert("El archivo no es un archivo .tsv");
		return;
	}
	//En cas que el tipus d'arxiu sigui el correcte, buida la taula principal i mostra totes les dades de l'arxiu.
	reader.readAsText(file[0]);
	$('#file').val("");
	reader.onload = function() {
		let text = reader.result;
		let linies = text.split("\n");
		let index = -1;
		let indexA = -1;
		for(let linia of linies) {
			let dades = linia.split("\t");
			if(dades.length == 9) {
				index = arrayFactures.findIndex(f => { return f.getId() == dades[0]; });
				if(index == -1) {
					let f = new Factura(dades[0], dades[1], dades[2], dades[3], dades[4], dades[5], dades[6], dades[7], dades[8]);
					arrayFactures.push(f);
				} else {
					let f = new Factura(dades[0], dades[1], dades[2], dades[3], dades[4], dades[5], dades[6], dades[7], dades[8]);
					let articles = arrayFactures[index].getArrayArticles();
					arrayFactures[index] = f;
					arrayFactures[index].setArrayArticles(articles);
				}
			} else if(dades.length == 6) {
				if(index == -1) {
					let a = new Article(dades[1], dades[2], dades[3], dades[4], dades[5]);
					arrayFactures[arrayFactures.length - 1].arrayArticles.push(a);
				} else {
					console.log("index: " + index);
					console.log(arrayFactures[index].arrayArticles);
					if (arrayFactures[index].getArrayArticles() == undefined) {
						arrayFactures[index].getArrayArticles() = [];
					} else {
						indexA = arrayFactures[index].getArrayArticles().findIndex(a => { return a.getCodi() == dades[1]; });
					}
					let a = new Article(dades[1], dades[2], dades[3], dades[4], dades[5]);
					if(indexA == -1) {
						arrayFactures[index].setArticle(a);
						arrayFactures[index].setArrayArticles(arrayFactures[index].arrayArticles);
					} else {
						arrayFactures[index].getArrayArticles()[indexA] = a;
					}
					console.log(arrayFactures[index]);
				}
			}
		}
		mostrarFactures();
	}
}

/**
 * @method init inicialitza les funcions i mostra les factures d'exemple.
 * 
 */
function init() {
	amagar();
	eventListeners();
	tec.teclat();
	
	$("#file").on("change", carregarFactures);
	let f = new Factura(1,"2023-01-31", "39950082W", "Cristina", "c/ Arboç nº2", "c.iglesia@gmail.com", "SI", 21, 0);
	arrayFactures.push(f);
	let f2 = new Factura(2, "2023-01-31", "39950082W", "Jony", "c/ Arboç nº2", "c.iglesia@gmail.com", "NO", 21, 0);
	arrayFactures.push(f2);
	let a = new Article(1, "Llibre", 3, 10, 30);
	let a2 = new Article(2, "Llibre2", 2, 10, 20);
	arrayFactures[0].setArticle(a);
	arrayFactures[0].setArticle(a2);
	console.log(arrayFactures);
	mostrarFactures();

}

//Carrega el mètode "init" per mostrar la pàgina principal.
$(document).ready(init);