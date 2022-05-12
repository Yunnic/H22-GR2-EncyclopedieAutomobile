import Vehicle from '../vehicle/Vehicle.js';
const config = require('../../config.json');

//Ce n'est techniquement pas une classe mais c'est proche (pour faire singleton)
const ApiCommunicator = {

  //Tutoriel pour comprendre : https://reactnative.dev/docs/network

  /**
   * Retourne les informations envoyés par l'API pour la base de données.
   *
   * @async
   * @function getInfoFromApi
   * @param  {String} methodString La méthode utilisée pour se connecter à l'API.
   * @param  {String} urlPath      Le lien URL qu'on veut envoyer ou lire l'information.
   * @param  {Object} body         L'information envoyé à l'API.
   * @return {Object}              L'information en json envoyée par l'API.
   */
  getInfoFromApi : async function (methodString, urlPath, body) {
    let infoRequest = {
      method: methodString,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    if (body != null) {
      infoRequest.body = body;
    }

    try {
      const response = await fetch(
        `${config.api.invokeUrl}/encyclopedie_automobile/${urlPath}`,
        infoRequest
      );

      const json = await response.json();
      return json;

    } catch (error) {
      console.log(error);
    }
  },


  /**
   * Retourne l'information à propos d'une automobile.
   *
   * @async
   * @function getCar
   * @param  {String} brand La marque d'une automobile
   * @param  {String} model Le modèle d'un automobile.
   * @return {Object}       L'information sur la voiture.
   */
  getCar: async function (brand, model) {
    const urlPath = `${brand}/${model}`;

    const json = await ApiCommunicator.getInfoFromApi('GET', urlPath, null);

    if (json != null && "Item" in json) {
      const vehicle = new Vehicle(json.Item);
      return vehicle;
    }

    return null;
  },


  /**
   * Retourne l'information à propos d'une marque.
   *
   * @async
   * @function getBrand
   * @param  {String} brand    La marque d'une automobile.
   * @return {Object}          L'information sur la marque.
   */
  getBrand: async function (brand) {
    const json = await ApiCommunicator.getInfoFromApi('GET', brand, null);

    if (json != null && "Item" in json) {
      return json.Item;
    }

    return null;
  },


  /**
   * Fait une recherche en utilisant le service OpenSearch.
   *
   * @async
   * @function openSearch
   * @param  {String} searchText Le texte qui est recherché.
   * @param  {Object} filters    Les filtres utilisés.
   * @return {Object}            Les résultats de la recherche.
   */
  openSearch: async function(searchText, filters) {
    const urlPath = `open-search`;

    const body = {
      "searchText" : searchText,
      "filters" : filters
    }

    const json = await ApiCommunicator.getInfoFromApi('POST', urlPath, JSON.stringify(body));
    return json;
  },


  /**
   * Fait une recherche. (ancien système, seulement utiliser si nécessaire)
   *
   * @async
   * @function search
   * @param  {String} urlPath      Le lien URL pour la recherche.
   * @param  {String} prjExpr      Information à propos des caractéristiques voulues.
   * @param  {String} filtExpr     Information à propos du filtre.
   * @param  {Object} exprAttNames Information à propos des noms des caractéristiques.
   * @param  {Object} exprAttVal   Information à propos des valeurs des caractéristiques.
   * @param  {Object} exclStartKey Détail à propos du dernier objet trouvé dans la dernière recherche.
   * @param  {String} keyCondiExpr Une condition spécifique pour la recherche.
   * @return {Object}              Les détails à propos des résultats obtenus.
   */
  search: async function(urlPath, prjExpr, filtExpr, exprAttNames, exprAttVal, exclStartKey, keyCondiExpr) {

      const optional = {
        "exclStartKey": exclStartKey,
        "keyCondiExpr": keyCondiExpr,
        "filtExpr": filtExpr,
        "exprAttNames": exprAttNames,
        "exprAttVal": exprAttVal
      };

      const body = {
        "prjExpr": prjExpr,
      }

      for (const optionalIndice in optional) {
        const optionalValue = optional[optionalIndice]
        if (optionalValue != null) {
          body[optionalIndice] = optionalValue;
        }
      }

      const json = await ApiCommunicator.getInfoFromApi('POST', urlPath, JSON.stringify(body));
      return json;
  },


  /**
   * Recherche de marques.
   *
   * @async
   * @function searchBrands
   * @param  {String} prjExpr      Information à propos des caractéristiques voulues.
   * @param  {String} filtExpr     Information à propos du filtre.
   * @param  {Object} exprAttNames Information à propos des noms des caractéristiques.
   * @param  {Object} exprAttVal   Information à propos des valeurs des caractéristiques.
   * @param  {Object} exclStartKey Détail à propos du dernier objet trouvé dans la dernière recherche.
   * @return {Object}              Les détails à propos des résultats obtenus.
   */
  searchBrands: async function (prjExpr, filtExpr, exprAttNames, exprAttVal, exclStartKey) {

    const urlPath = `search/brand`;

    const found = await ApiCommunicator.search(urlPath, prjExpr,
      filtExpr, exprAttNames, exprAttVal, exclStartKey);

    return found;
  },


  /**
  * Recherche de modèles d'automobile.
  *
  * @async
  * @function searchModels
  * @param  {String} prjExpr      Information à propos des caractéristiques voulues.
  * @param  {String} filtExpr     Information à propos du filtre.
  * @param  {Object} exprAttNames Information à propos des noms des caractéristiques.
  * @param  {Object} exprAttVal   Information à propos des valeurs des caractéristiques.
  * @param  {Object} exclStartKey Détail à propos du dernier objet trouvé dans la dernière recherche.
  * @return {Object}              Les détails à propos des résultats obtenus.
   */
  searchModels: async function (prjExpr, filtExpr, exprAttNames, exprAttVal, exclStartKey) {

    const urlPath = `search/model`;

    const found = await ApiCommunicator.search(urlPath, prjExpr,
      filtExpr, exprAttNames, exprAttVal, exclStartKey);

    return found;
  },

  /**
  * Recherche de modèles d'automobile d'une marque précise.
  *
  * @async
  * @function searchBrandModels
  * @param  {String} prjExpr      Information à propos des caractéristiques voulues.
  * @param  {String} keyCondiExpr Une condition spécifique pour la recherche.
  * @param  {String} filtExpr     Information à propos du filtre.
  * @param  {Object} exprAttNames Information à propos des noms des caractéristiques.
  * @param  {Object} exprAttVal   Information à propos des valeurs des caractéristiques.
  * @param  {Object} exclStartKey Détail à propos du dernier objet trouvé dans la dernière recherche.
  * @return {Object}              Les détails à propos des résultats obtenus.
   */
  searchBrandModels: async function (prjExpr, keyCondiExpr, filtExpr, exprAttNames, exprAttVal, exclStartKey) {

    const urlPath = `search/brand/model`;

    const found = await ApiCommunicator.search(urlPath, prjExpr,
      filtExpr, exprAttNames, exprAttVal, exclStartKey, keyCondiExpr);

    return found;
  }
}

export default ApiCommunicator;
