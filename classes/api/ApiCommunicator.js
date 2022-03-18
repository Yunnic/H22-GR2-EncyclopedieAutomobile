const config = require('../../config.json');

//Ce n'est techniquement pas une classe mais c'est proche (singleton)
const ApiCommunicator = {

  //https://reactnative.dev/docs/network
  getInfoFromApi : async function (methodString, urlPath, body) {
    const infoRequest = {
      method: methodString,
      headers: {
        Accept: 'application/json',
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

      if ("Item" in json) {
        return json.Item;
      } else {
        return null;
      }

    } catch (error) {
      console.log(error);
    }
  },

  getCar: async function (brand, model) {
    const urlPath = `${brand}/${model}`;

    const item = await ApiCommunicator.getInfoFromApi('GET', urlPath, null);
    return item;
  },

  //ne fonctionne pas pour l'instant (pas implémenté encore)
  getBrand: async function (brand) {
    const item = await ApiCommunicator.getInfoFromApi('GET', brand, null);
    return item;
  }
}

export default ApiCommunicator;
