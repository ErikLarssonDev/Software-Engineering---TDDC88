import { apiRequest } from "./apiRequest";

export const fetchCompartment = async (param) => {
    const result = await apiRequest("compartments", "GET", param);
    return result;
  };

  export const fetchCompartmentLio = async (param) => {
    const result = await apiRequest("articles/lio", "GET", param);
    return result;
  };

  export const fetchCompartmentName = async (param) => {
    const result = await apiRequest("articles/name", "GET", param);
    return result;
  };

  /* Unit hardcoded for now, will change when the functionality is available */

  export const changeQuantity = async (param, qrCode, storageId, quantity, operation) => {
    return apiRequest("transactions", "POST", "",
      {
        "qrCode": qrCode,
        "storageId": storageId,
        "quantity": quantity,
        "unit": "output",
        "operation": operation
      }
    );
  };

  export const deleteCompartment = async (param) => {
    const result = await apiRequest("compartments", "DELETE", param);
    return apiRequest("compartments", "DELETE", param);
  }


