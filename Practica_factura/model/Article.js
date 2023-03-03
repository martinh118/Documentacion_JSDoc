/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description Classe que representa un article de la factura
 */

/**
 * @param {string} codi - Codi de l'article (identificador del producte)
 * @param {string} nom - Nom de l'article
 * @param {number} unitat - Unitats de l'article (quantitat dels productes)
 * @param {number} preu - Preu de l'article (preu unitari del producte)
 * @param {number} subtotal - Subtotal de l'article (preu * unitats)
 * @method getCodi - Retorna el codi de l'article
 * @method getNom - Retorna el nom de l'article
 * @method getUnitat - Retorna les unitats de l'article
 * @method getPreu - Retorna el preu de l'article
 * @method getSubtotal - Retorna el subtotal de l'article
 * @method crearArticle - Crea un nou article
 * @returns {Article} - Retorna un objecte de tipus Article
 */
export class Article {
    #codi;
    #nom;
    #unitats;
    #preu;
    #subtotal;

    constructor(codi, nom, unitat, preu, subtotal) {
        this.#codi = codi;
        this.#nom = nom;
        this.#unitats = unitat;
        this.#preu = preu;
        this.#subtotal = subtotal;
    }

    // Getters retornen els valors de les propietats
    getCodi() {return this.#codi};
    getNom() {return this.#nom};
    getUnitat() {return this.#unitats};
    getPreu() {return parseFloat(this.#preu)};
    getSubtotal() {return parseFloat(this.#subtotal)};


    crearArticle(nom, unitat, preu) {
        new Article(nom, unitat, preu);
    }
}