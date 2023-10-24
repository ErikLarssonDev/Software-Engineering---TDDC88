import { apiRequest } from "./apiRequest";

/**
 * 
 * @param {string} The string that decides the storage id to target.
 * @returns The storage related to the id.
 */

export const fetchStorage = async (param) => {
    const result = await apiRequest("storages", "GET", param); 
    return result;
}

export const getRightStorage = () => {

}

/**
 * 
 * @returns All storages.
 */
export const fetchAllStorages = async () => {
    const result = await apiRequest("storages", "GET", "");
    return result;
}

/**
 * @param {string} param The string that decides the storage id to target.
 * @param {object} selectedStorage The storage to connect to.
 * @param {object} articleToConnect The article to connect to the storage.
 * @returns 
 */
 export const connectArticle = async (param, lioNr, quantity) => {
    return apiRequest("connectArticleToCompartment", "PUT", param,
        {
            "lioNr": lioNr,
            "quantity": parseInt(quantity),
            "normalOrderQuantity": 0,
            "orderQuantityLevel": 0,
        }
    );
};

/**
 * Still has some issues with updating supplierName and supplierArticleNr
 * @param {string} param The string that decides the storage id to target.
 * @param {object} storageFrom The storage to move an article from.
 * @param {object} selectedStorage The storage to move an article to.
 * @returns 
 */
export const moveArticle = async (param, fromCompartmentQrCode, toCompartmentQrCode, quantity) => {
    return apiRequest("moveArticle", "POST", "",
        {
            "fromCompartmentQrCode": fromCompartmentQrCode,
            "toCompartmentQrCode": toCompartmentQrCode,
            "unit": "output",
            "quantity": quantity
        }
    );
};

/**
 * selectedStorage as a parameter to keep certain data of the selected storage
 * after updating it.
 * @param {string} param The string that decides the storage id to target.
 * @param {object} selectedStorage The storage to remove an article from.
 * @returns 
 */
export const removeArticleFromStorage = async (param, selectedStorage) => {
    return apiRequest("storages", "PATCH", param, {
        compartments: {
            placement: selectedStorage.compartments.placement,
            storageId: selectedStorage.compartments.storageId,
            qrCode: selectedStorage.compartments.qrCode,
            quantity: 0,
            normalOrderQuantity: 0,
            orderQuantityLevels: 0,
            article: {
                units: {
                    input: "",
                    output: "",
                    outputPerInput: 0,
                },
                price: 0,
                suppliers: [
                    {
                        supplierName: "",
                        supplierArticleNr: "",
                    }
                ],
                name: "",
                alternativeNames: [
                    ""
                ],
                lioNr: "",
                alternativeProducts: [
                    ""
                ],
                Z41: true
            }
        }
    })
}

/**
 * 
 * @param {string} param The string that decides the storage id to target.
 * @param {object} selectedStorage The storage to update.
 * @param {int} quantity The new quantity.
 * @returns 
 */
export const updateStorageQuantity = async (param, placement, storageId, quantity, normalOrderQuantity, orderQuantityLevel) => {
    return apiRequest("compartments", "PUT", param, {

        placement: placement,
        storageId: storageId,
        quantity: parseInt(quantity),
        normalOrderQuantity: normalOrderQuantity,
        orderQuantityLevel: orderQuantityLevel

        /*compartments: {
            placement: storage.compartments.placement,
            storageId: storage.compartments.storageId,
            qrCode: storage.compartments.qrCode,
            quantity: quantity,
            normalOrderQuantity: storage.compartments.normalOrderQuantity,
            orderQuantityLevel: storage.compartments.orderQuantityLevel,
            article: {
                units: {
                    input: storage.compartments.article.units.input,
                    output: storage.compartments.article.units.output,
                    outputPerInput: storage.compartments.article.units.outputPerInput,
                },
                price: storage.compartments.article.price,
                suppliers: [
                    {
                        supplierName: storage.compartments.article.suppliers.supplierName,
                        supplierArticleNr: storage.compartments.article.suppliers.supplierArticleNr,
                    }
                ],
                name: storage.compartments.article.name,
                alternativeNames: [
                    storage.compartments.article.alternativeNames
                ],
                lioNr: storage.compartments.article.lioNr,
                alternativeProducts: [
                    storage.compartments.article.alternativeProducts
                ],
                Z41: storage.compartments.article.Z41 
            }
        }*/
    })
}
