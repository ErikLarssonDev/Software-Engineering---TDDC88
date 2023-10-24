// get article with QR code or searching by lionr
// change number in stock by QR code

import { apiRequest } from "./apiRequest";

/**
 * 
 * @returns Returns all articles in the JSON server.
 */
export const fetchAllArticles = async () => {
  const result = await apiRequest("articles", "GET", "")
  return result;
}
export const fetchArticles = async () => {
  const result = await apiRequest("articles/", "GET", "")
  return result;
}

export const changeQuantity = async (param, quantity) => {
  return apiRequest("transactions", "POST", param, {
    quantity: parseInt(quantity),
  });
};


/**
 *
 * @param {string} param0 The string that decides the qr code id to target. Used in the URL: HOST/path/param
 * @returns The article and compartment that is related to the qr code id.
 */

export const fetchArticle = async (param) => {
  const result = await apiRequest("articles/qr", "GET", param);
  return result;
};

/**
 *
 * @param {string} param0 The string that decides the LIO number to target. Used in the URL: HOST/path/param.
 * @returns The article that is related to the LIO number.
 */

export const fetchArticleLio = async (param) => {
  const result = await apiRequest("articles/lio", "GET", param);
  return result;
};

/**
 *
 * @param {string} param0 The string that decides the article name to target. Used in the URL: HOST/path/param.
 * @returns The article that is related to the article name.
 */

export const fetchArticleName = async (param) => {
  const result = await apiRequest("articles/name", "GET", param);
  return result;
};

/**
 *
 * @param {string} param The string that decides the qr code id to target. Used in the URL: HOST/path/param
 * @param {integer} quantity The quantity that we want to change to.
 * @returns The article and compartment that is related to the qr code id.
 */

/**
 * 
 * @param {object} scannedData The scanned data from the QR scanner.
 * @param {function} setSelected The setSelected function for the recoil state.
 * @param {string} navigate The URL that the scanner should navigate on successful scan. 
 * @param {function} setShowDialog The set function for the showDialog useState.
 * @returns 
 */
export const onScan = async (scannedData, setSelected, navigate, setShowDialog) => {
  if (scannedData) {
    const queryRes = await fetchArticle(scannedData.data);

    if (queryRes.lioNr != null) {
      setSelected({ ...queryRes, amount: 0 });
      navigate(navigate);
    } else {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 3000);

      return;
    }
  }
};

/**
 * 
 * @param {string} storageId 
 * @param {string} article {"lioNr": "string", "quantity": 0, "unit": "input"}
 * @returns returns the resonse from the server.
 */

export const orderItem = async (storageId, articles) => {
  const requestBody = { storageId, articles }
  return apiRequest("orders", "POST", "", requestBody)
}

/**
 * 
 * @param {string} param The qr code id for the article.
 * @param {integer} normalOrderQuantity The order quantiy.
 * @param {integer} orderQuantityLevel  The order quantity level.
 * @returns The article and compartment that is related to the qr code id.
 */

export const changeAutoOrder = async (param, normalOrderQuantity, orderQuantityLevel) => {
  return apiRequest("articles/qr", "PATCH", param, {
    normalOrderQuantity: parseInt(normalOrderQuantity),
    orderQuantityLevel: parseInt(orderQuantityLevel)
  })
}

