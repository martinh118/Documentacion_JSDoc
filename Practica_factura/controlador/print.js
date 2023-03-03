
/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description Script que imprimeix la factura
 */

const pagat = "<div class='especial'>PAGAT</div>";
$(document).ready(function() {
   imprimirdades();
   window.print();

});

/**
 * @method imprimirdades Funció que imprimeix les dades de la factura
 * @returns {void}
 */
function imprimirdades() {
   let dades = decodeURIComponent(window.location.search).replace(/\+/g," ");
   console.log(dades);
   dades = dades.substring(1);
   let lldades = dades.split("&");
   for(let i = 0; i < lldades.length; i++) {
       switch(lldades[i].split("=")[0]) {

        //per cada cas, agafem el valor de la dada i l'afegim a la taula html corresponent
           case "data":
                //trobem el td de la taula amb la classe intro i li afegim el valor de la dada (data) al primer td
               $("#intro td:eq(0)").text(lldades[i].split("=")[1]);
               break;
           case "id":
                //trobem el td de la taula amb la classe intro i li afegim el valor  de la dada (id) al segon td
               $("#intro td:eq(1)").text(lldades[i].split("=")[1]);
               break;
           case "nif":
                //trobem el td de la taula amb la classe Client i li afegim el valor de la dada (nif) al primer td
               $("#client td:eq(0)").text(lldades[i].split("=")[1]);
               break;
           case "nom":
                //trobem el td de la taula amb la classe Client i li afegim el valor de la dada (nom) al segon td
               $("#client td:eq(1)").text(lldades[i].split("=")[1]);
               break;
           case "adreca":
                //trobem el td de la taula amb la classe Client i li afegim el valor de la dada (adreça) al tercer td
               $("#client td:eq(2)").text(lldades[i].split("=")[1]);
               break;
           case "correu":
                //trobem el td de la taula amb la classe Client i li afegim el valor de la dada (correu) al quart td
               $("#client td:eq(3)").text(lldades[i].split("=")[1]);
               break;

           case "articles":
                let articles = lldades[i].split("=")[1].split(";");
                // per cada article li afegim en un tbody de la taula articles
                for(let j = 0; j < articles.length - 1; j++) {
                    let article = articles[j].split(",");
                    $("#articles tbody").append("<tr><td>"+article[0]+"</td><td>"+article[1]+"</td><td>"+article[2]+"</td><td>"+article[3]+"</td><td>"+article[4]+"</td></tr>");
                }
                break;
           case "iva":
                //trobem el td de la taula de total i li afegim el valor de la dada (IVA) al primer td
               $("#total td:eq(0)").text(lldades[i].split("=")[1] + "%");
               break;
            case "importIVA":
                //trobem el td de la taula de total i li afegim el valor de la dada (importIVA) al segon td
                $("#total td:eq(1)").text(lldades[i].split("=")[1] + "€");
                break;
           case "totalfinal":
                //trobem el td de la taula de total i li afegim el valor de la dada (totalfinal) al tercer td
               $("#total td:eq(2)").text(lldades[i].split("=")[1] + "€");
               break;
            case "totalarticle":
                //trobem el td de la taula de total i li afegim el valor de la dada (totalarticle) al quart td
                $("#articles tbody").append("<tr><td colspan=\"4\">Total:</td><td>" + lldades[i].split("=")[1] + " €</td></tr>");
                break;
           case "pagat":
                //si la factura està pagada, afegim el div especial amb el text pagat
               if(lldades[i].split("=")[1] == "SI") {
                   $("body").append(pagat);  
                }
                break;
        }
   }
}