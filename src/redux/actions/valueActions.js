import { SET_PRODUCTS } from '../types';

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});
