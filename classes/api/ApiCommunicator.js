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

      return json;

    } catch (error) {
      console.log(error);
    }
  },

  getCar: async function (brand, model) {
    const urlPath = `${brand}/${model}`;

    const json = await ApiCommunicator.getInfoFromApi('GET', urlPath, null);

    if (json != null && "Item" in json) {
      return json.Item;
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

  searchBrand: async function (prjExpr, filtExpr, exprAttNames,
    exprAttVal, exclStartKey) {

    const urlPath = `search/brand`;
    /* exemple de body:

    recherche de marques qui possède vo dans leur nom apres Mitsubishi (aucun).
    {
      "prjExpr": "#nm, Logo",
      "filtExpr": "contains(#nm, :nmText)",
      "exprAttNames": {
        "#nm": "Name"
      },
      "exprAttVal": {
        ":nmText": "Vo"
      },
      "exclStartKey": {
        "Name": "Mitsubishi"
      }
    }
    */

    const body = {
      "prjExpr": prjExpr,
      "filtExpr": filtExpr,
      "exprAttNames": exprAttNames,
      "exprAttVal": exprAttVal
    }

    if (exclStartKey != null) {
      body["ExclusiveStartKey"] = exclStartKey;
    }

    const json = await ApiCommunicator.getInfoFromApi('POST', urlPath, JSON.stringify(body));
    return json;
  }
}

export default ApiCommunicator;
