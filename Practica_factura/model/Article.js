/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description Classe que representa un article de la factura
 */

export class Article {
/**
 * @param {string} codi - Codi de l'article (identificador del producte)
 * @param {string} nom - Nom de l'article
 * @param {number} unitat - Unitats de l'article (quantitat dels productes)
 * @param {number} preu - Preu de l'article (preu unitari del producte)
 * @param {number} subtotal - Subtotal de l'article (preu * unitats)
 * @returns {Article} - Retorna un objecte de tipus Article
 */
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
    /**
     * RETORNA EL CODI DE L'ARTICLE
     * @returns {string} - Retorna el codi de l'article
     */
    getCodi() {return this.#codi};

    /**
     *  RETORNA EL NOM DE L'ARTICLE
     * @returns {string} - Retorna el nom de l'article
     */
    getNom() {return this.#nom};

    /**
     * RETORNA LES UNITATS DE L'ARTICLE
     * @returns {number} - Retorna les unitats de l'article
     */
    getUnitat() {return this.#unitats};

    /**
     * RETORNA EL PREU DE L'ARTICLE
     * @returns {number} - Retorna el preu de l'article
     */

    getPreu() {return parseFloat(this.#preu)};
    
    /**
     * RETORNA EL SUBTOTAL DE L'ARTICLE
     * @returns {number} - Retorna el subtotal de l'article
     */
    getSubtotal() {return parseFloat(this.#subtotal)};

    /**
     * Crear un article
     * @param {String} nom 
     * @param {Number} unitat 
     * @param {Number} preu 
     */
    crearArticle(nom, unitat, preu) {
        new Article(nom, unitat, preu);
    }
}
