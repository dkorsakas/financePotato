import { ADD_CUSTOMER_POINT, SET_CUSTOMER_POINTS } from '../types';

export const addCustomerPoint = (newCustomerPoint) => ({
    type: ADD_CUSTOMER_POINT,
    payload: newCustomerPoint,
});

export const setCustomerPoints = (customerPoints) => ({
    type: SET_CUSTOMER_POINTS,
    payload: customerPoints,
});
