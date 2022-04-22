import Voiture from '../voiture/Voiture.js';
const config = require('../../config.json');

//Ce n'est techniquement pas une classe mais c'est proche (singleton)
const ApiCommunicator = {

  //https://reactnative.dev/docs/network
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
      console.log(json);
      return json;

    } catch (error) {
      console.log(error);
    }
  },

  getCar: async function (brand, model) {
    const urlPath = `${brand}/${model}`;

    const json = await ApiCommunicator.getInfoFromApi('GET', urlPath, null);

    if (json != null && "Item" in json) {
      const voiture = new Voiture(json.Item)
      return voiture;
    }

    return null;
  },

  getBrand: async function (brand) {
    const json = await ApiCommunicator.getInfoFromApi('GET', brand, null);

    if (json != null && "Item" in json) {
      return json.Item;
    }

    return null;
  },

  search: async function(urlPath, prjExpr, filtExpr, exprAttNames, exprAttVal,
    exclStartKey, keyCondiExpr) {

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

      console.log(body);

      const json = await ApiCommunicator.getInfoFromApi('POST', urlPath, JSON.stringify(body));
      return json;
  },

  searchBrands: async function (prjExpr, filtExpr, exprAttNames,
    exprAttVal, exclStartKey) {

    const urlPath = `search/brand`;

    const found = await ApiCommunicator.search(urlPath, prjExpr,
      filtExpr, exprAttNames, exprAttVal, exclStartKey);

    return found;
  },

  searchModels: async function (prjExpr, filtExpr, exprAttNames,
    exprAttVal, exclStartKey) {

    const urlPath = `search/model`;

    const found = await ApiCommunicator.search(urlPath, prjExpr,
      filtExpr, exprAttNames, exprAttVal, exclStartKey);

    return found;
  },

  searchBrandModels: async function (prjExpr, keyCondiExpr, filtExpr,
    exprAttNames, exprAttVal, exclStartKey) {

    const urlPath = `search/brand/model`;

    const found = await ApiCommunicator.search(urlPath, prjExpr,
      filtExpr, exprAttNames, exprAttVal, exclStartKey, keyCondiExpr);

    return found;
  }
}

export default ApiCommunicator;
