
/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description Modifica la taula per tal que quan es faci doble click sobre una cel·la, es pugui editar el seu contingut
 */


function modTabla() {
    /**
     * creem un event de doble click per a cada una de les cel·les de la taula
     */
    const tds=document.querySelectorAll("td");
    for(td of tds) {
        td.addEventListener("dblclick",function() {
     
            //creem un nou input amb el valor actual de la cel·la
            let input=document.createElement('input');
            input.value=this.textContent;
     
            //event que s'executa quan l'input perd el focus (quan es clica fora)
            input.addEventListener("blur",function() {
                removeInput(this);
            });
     
            // event que s'executa quan es deixa de premre una tecla
            input.addEventListener("keydown",function(e) {
     
                // la tecla 13, es el Enter
                if(e.which==13) {
                    removeInput(this);
                }
            });
    
            //treurem el contingut de la cel·la de la taula
            this.textContent="";
     
            // posem en la cel·la l'input que hem creat
            this.appendChild(input);
        });
    }
     
    /**
     * Elimina el input i posa el seu valor a la cel·la
     * @param {Object} e
     * @returns {void}
     */
        function removeInput(e) {
            e.parentElement.textContent=e.value;
        }
    }