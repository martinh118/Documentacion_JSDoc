/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description Classe que representa una factura
 * @see Article.js
 */
import {Article} from "./Article.js";

/**
 * @class Factura 
 * @description - Classe que representa una factura
 * 
* 
* @param {number} id - Identificador de la factura (autoincremental)
* @param {string} data - Data de la factura format (dd/mm/aaaa)
* @param {string} nif - NIF del client format (00000000A)
* @param {string} nom - Nom del client
* @param {string} adreca - Adreça del client
* @param {string} correu - Correu electrònic del client
* @param {boolean} pagat - Indica si la factura està pagada
* @param {number} iva - IVA de la factura (21%)
* @param {number} total - Total de la factura (IVA inclos)
* @param {array} arrayArticles - Array d'articles de la factura (Article)
* @returns {Factura} - Factura
 */
export class Factura {
    #id;
    #data;
    #nif;
    #nom;
    #adreca;
    #correu;
    #pagat;
    #iva;
    #total;
    #importIva;
    #arrayArticles = [];
    

    
    constructor(id, data, nif, nom, adreca, correu, pagat, iva, total) {
        this.#id = id;
        this.#data = data;
        this.#nif = nif;
        this.#nom = nom;
        this.#adreca = adreca;
        this.#correu = correu;
        this.#pagat = pagat;
        this.#iva = iva;
        this.#total = total;
    }

    /**
     * @method getId 
     * @description Retorna l'identificador de la factura.
     * @returns {Number} id.
     */
    getId() {return this.#id};
    /**
     * @method getData 
     * @description Retorna la data de la factura format (dd/mm/aaaa).
     * @returns {Date} data.
     */
    getData() {return this.#data};
    /**
     * @method getNif 
     * @description Retorna el NIF del client format (00000000A).
     * @returns {String} - nif
     */
    getNif() {return this.#nif};
    /**
    * @method getNomClient 
    * @description Retorna el nom del client.
    * @returns {String} - nom
    */
    getNomClient() {return this.#nom};
    /**
     * @method getAdreca 
     * @description Retorna l'adreça del client.
     * @returns {String} - adreca
     */
    getAdreca() {return this.#adreca};
    /**
     * @method getCorreu 
     * @description Retorna el correu electrònic del client.
     * @returns {String} - correu
     */
    getCorreu() {return this.#correu};
    /**
     * @method getPagat 
     * @description Retorna si la factura està pagada.
     * @returns {Boolean} - pagat
     */
    getPagat() {return this.#pagat};
    /**
     * @method getIva 
     * @description Retorna l'IVA de la factura (21%).
     * @returns {Number} - iva
     */
    getIva() {return this.#iva};
    /**
     * @method getTotal 
     * @description Retorna el total de la factura (IVA inclos).
     * @returns {Number} - total
     */
    getTotal() {return this.#total};
    /**
     * @method getArrayArticles 
     * @description Retorna l'array d'articles de la factura (Article).
     * @returns {Array} - arrayArticles
     */
    getArrayArticles() {return this.#arrayArticles};
    /**
     * @method setArrayArticles 
     * @description Assigna l'array d'articles de la factura (Article).
     * @param {Array} arrayArticles 
     */
    setArrayArticles(arrayArticles) {this.#arrayArticles = arrayArticles};
    /**
     * @method setArticle 
     * @description Assigna un article a l'array d'articles de la factura (Article).
     * @param {Article} article 
     */
    setArticle(article) {this.#arrayArticles.push(article)};
    /**
     * @method setTotal 
     * @description Assigna el total de la factura (IVA inclos)
     * @param {Number} total 
     */
    setTotal(total) {this.#total = total};

    /**
     * @method imprimirArticles 
     * @description Els articles de la factura
     * @returns {String} - registre.
     */
    imprimirArticles() {
        let registre = "";
        for(let article of this.#arrayArticles) {
            registre += "<tr>"
            registre += "<td>" + article.getCodi() + "</td>";
            registre += "<td>" + article.getNom() + "</td>";
            registre += "<td class=\"unitats\">" + article.getUnitat() + "</td>";
            registre += "<td class=\"preu\">" + article.getPreu() + "</td>"
            registre += "<td>" + article.getSubtotal() + "</td>";
            registre += "<td>" + "<button class='delArticle'><img src='../sources/delete.svg'></button>" + "</td>";
            registre += "</tr>";
        }
        return registre;
    }

    //
    /**
     * @method afegirArticle 
     * @description Article a la factura
     * @param {Number} codi 
     * @param {String} nom 
     * @param {Number} unitat 
     * @param {Number} preu 
     * @param {Number} subtotal 
     */
    afegirArticle(codi, nom, unitat, preu, subtotal) {
        let article = new Article(codi, nom, unitat, preu, subtotal);
        this.#arrayArticles.push(article);
    }
    
    // 
    /**
     * @method imprimirFactura 
     * @description imprimeix la factura 
     * @returns {String} - registre.
     */
    imprimirFactura() {
        let registre = "";

        registre += "<td>" + this.#id + "</td>";
        registre += "<td>" + this.#data + "</td>";
        registre += "<td>" + this.#nif + "</td>";
        registre += "<td>" + this.#nom + "</td>";
        registre += "<td>" + this.#adreca + "</td>";
        registre += "<td>" + this.#correu + "</td>";
        registre += "<td>" + this.#pagat + "</td>";
        registre += "<td>" + this.#iva + "%</td>";
        registre += "<td>" + this.#total + "</td>";
        registre += "<td>" + "<button id='edit"+ this.#id +"'><img src='../sources/edit.svg'></button>" + "<button id='delete"+ this.#id +"'><img src='../sources/delete.svg'></button>" + "<button id='articles"+ this.#id +"'><img src='../sources/articles.svg'></button>" + "<button id='print"+ this.#id +"'><img src='../sources/printer.svg'></button>" +"</td>"
        return registre;
    }
}