/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description Calculs de la factura
 */

/**
 * @method calcularSubtotal 
 * @description calcular el subtotal de cada article
 * @param {event} event passa l'event que ha disparat la funció
 * 
 */
export function calcularSubtotal(event) {
	let eventTd = event.currentTarget;
	let tdPreu = "";
	let tdSubtotal = "";
	let tdUnitats = "";

	if(eventTd.className == "preu") {
		tdPreu = eventTd;
		tdSubtotal = eventTd.nextSibling;
		tdUnitats = eventTd.previousSibling;
	} else {
		tdPreu = eventTd.nextSibling;
		tdSubtotal = tdPreu.nextSibling;
		tdUnitats = eventTd;
	}

	let preu = parseFloat(tdPreu.textContent);
	let unitats = parseFloat(tdUnitats.textContent);

	
	tdSubtotal.textContent = preu * unitats;
	totalArticle();
}

/**
 * @method totalArticle 
 * @description A partir de les unitats i el preu de cada article, calcula el total de la factura.
 * 
 */
export function totalArticle() {
	let rows = $('#taulaArticles tbody tr');
	let total = 0;

	// per cada article mira la quantitat que hi ha i el preu i els multiplica
	for (let i = 0; i < rows.length; i++) {
		let unitats = parseFloat(rows[i].children[2].textContent);
		let preu = parseFloat(rows[i].children[3].textContent);
		total += (unitats * preu);
	}
	
	$('#totalArticles').text(total);
}

/**
 * @method totalFactura 
 * @description calcular el total de la factura
 * @param {array} arrayFactures array de factures
 */
export function totalFactura(arrayFactures) {

	//per cada factura agafa el subtotal i el guarda a preuFinal
	for (const factura of arrayFactures) {
		
		let preuFinal = 0.0;

		let arrayArticles = factura.getArrayArticles();

		for (const article of arrayArticles) {
			preuFinal += article.getSubtotal();
		}

		let iva = factura.getIva();
		iva = iva / 100;

		//calcula el preuFinal afegint l'iva
		preuFinal = parseFloat(preuFinal + (preuFinal * iva));
		factura.setTotal(preuFinal);
	}
}