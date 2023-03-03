/**
 * @author Martín H. Jaime & Sergi Sanahuja
 * @version 1.0
 * @description Classe que representa una factura
 * @see Article.js
 */
import {Article} from "./Article.js";

/**
 * @class Factura 
 * @description Classe que representa una factura
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
 * 
 * @method getId - Retorna l'identificador de la factura
 * @method getData - Retorna la data de la factura format (dd/mm/aaaa)
 * @method getNif - Retorna el NIF del client format (00000000A)
 * @method getNomClient - Retorna el nom del client
 * @method getAdreca - Retorna l'adreça del client
 * @method getCorreu - Retorna el correu electrònic del client
 * @method getPagat - Retorna si la factura està pagada
 * @method getIva - Retorna l'IVA de la factura (21%)
 * @method getTotal - Retorna el total de la factura (IVA inclos)
 * @method getArrayArticles - Retorna l'array d'articles de la factura (Article)
 * 
 * @method setArrayArticles - Assigna l'array d'articles de la factura (Article)
 * @method setArticle - Assigna un article a l'array d'articles de la factura (Article)
 * @method setTotal - Assigna el total de la factura (IVA inclos)
 * 
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

    getId() {return this.#id};
    getData() {return this.#data};
    getNif() {return this.#nif};
    getNomClient() {return this.#nom};
    getAdreca() {return this.#adreca};
    getCorreu() {return this.#correu};
    getPagat() {return this.#pagat};
    getIva() {return this.#iva};
    getTotal() {return this.#total};
    getArrayArticles() {return this.#arrayArticles};
    setArrayArticles(arrayArticles) {this.#arrayArticles = arrayArticles};
    setArticle(article) {this.#arrayArticles.push(article)};
    setTotal(total) {this.#total = total};


    // imprimeix els articles de la factura
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

    //afegir article a la factura
    afegirArticle(codi, nom, unitat, preu, subtotal) {
        let article = new Article(codi, nom, unitat, preu, subtotal);
        this.#arrayArticles.push(article);
    }
    
    // imprimeix la factura 
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