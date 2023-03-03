/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description controlador del teclat, cada cop que omples un camp i premes "Enter" es passa al següent camp
 * si premes "Esc" es tanca el formulari
 * 
 */

/**
 * @method teclat
 * @description controlador del teclat, cada cop que omples un camp i premes "Enter" es passa al següent camp
 * si premes "Esc" es tanca el formulari
 */
export function teclat() {
	//Es la tecla "Esc"
	$("body").on("keydown", function(e) {
		if(e.keyCode == 27) {
			amagar();
		}
	});	
	$("#nif").on("keydown", function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			$("#nom").focus();
		}
	});
	$("#nom").on("keydown", function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			$("#correu").focus();
		}
	});

	$("#correu").on("keydown", function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			$("#adreca").focus();
		}
	});

	$("#adreca").on("keydown", function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			$("#data").focus();
		}
	});

	$("#data").on("keydown", function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			$("#pagat").focus();
		}
	});

	$("#pagat").on("keydown", function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			$("#iva").focus();
		}
	});

	$("#iva").on("keydown", function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			$("#submitFactura").focus();
		}
	});

	$("#submitFactura").on("keydown", function(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			$("#submitFactura").click();
		}
	});

	$("#submitFactura").on("keydown", function(e) {
		if(e.keyCode == 39) {
			e.preventDefault();
			$("#cancelar").focus();
		}
	});

	$("#cancelar").on("keydown", function(e) {
		if(e.keyCode == 37) {
			e.preventDefault();
			$("#submitFactura").focus();
		}
	});	
}