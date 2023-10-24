// get order with searching by id

import { apiRequest } from "./apiRequest";

/**
 *
 * @returns All orders.
 */

export const fetchOrders = async () => {
    const result = await apiRequest("orders", "GET", "");
    return result
};

/**
 *
 * @param {string} param0 The string that decides the id to target. Used in the URL: HOST/path/param.
 * @returns The articles that is related to the order id.
 */

export const fetchOrderId = async (param) => {
    const result = await apiRequest("orders", "GET", param);
    return result;
};

/**
 *
 * @param {string} param The string that decides the id to target. Used in the URL: HOST/path/param
 * @param {integer} quantity The quantity that we want to change to.
 * @returns The article that is related to the orderid.
 */

export const changeQuantity = async (param, quantity) => {
    return apiRequest("orders", "PATCH", param, {
        compartments: {
            quantity: parseInt(quantity),
        }
    });
};