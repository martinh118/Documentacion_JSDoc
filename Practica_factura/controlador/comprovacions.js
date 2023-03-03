/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description Comprovacions de les dades introduïdes per l'usuari
 */

/**
 * @method validarFactura comprova que les dades introduïdes siguin correctes
 * @param {Event} event
 */
export function validarFactura(event) {

	switch (event.target.id) {
		case "nif":
			comprovarNIF(event.target.value)
			break;
		case "nom":
			comprovarNom(event.target.value);
			break;
		case "correu":
			comprovarCorreu(event.target.value);
			break;
		default:
			break;
	}
}

/**
 * @method comprovarNIF Comprova si el NIF és correcte
 * @param {String} nif nit a comprovar format 00000000A
 */
export function comprovarNIF(nif) {
	let cnif = parseInt(nif.substring(0, 8)) % 23;
	let a = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
	if(nif.substring(8) != a[cnif]) {
		mostrarError("NIF incorrecte");
		return false;
	} else {
		if($('#error').text() == "NIF incorrecte") {
			mostrarError("");
		}
		return true;
	}

}

/**
 * @method comprivarNom Comprova que el nom no contigui números ni caràcters especials
 * @param {String} nom 
 */
export function comprovarNom(nom) {
	let pattern = /^[a-zA-Z]{0,50}$/;
	if(!pattern.test(nom)) {
		mostrarError("Nomès es poden afegir lletres al nom.");
		return false;
	} else {
		if($('#error').text() == "Nomès es poden afegir lletres al nom.") {
			mostrarError("");
		}
		return true;
	}
}

/**
 * @method comprovarCorreu Comprova que el correu electrònic sigui correcte.
 * @param {String} email format exemple@gmail.com
 */
export function comprovarCorreu(email) {
	var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (!pattern.test(email)){
		mostrarError("El correu electrònic no és correcte");
		return false;
	} else {
		if($('#error').text() == "El correu electrònic no és correcte") {
			mostrarError("");
		}
		return true;
	}
}