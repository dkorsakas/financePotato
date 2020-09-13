import {
    ADD_CUSTOMER_POINT,
    SET_CUSTOMER_POINTS,
    ADD_PRODUCT_POINT,
    SET_PRODUCT_POINTS,
    ADD_INDUSTRY_POINT,
    SET_INDUSTRY_POINTS,
    ADD_FROM_POINT,
    SET_FROM_POINTS,
} from '../types';

const initialState = {
    understand: {
        products: [''],
        customers: [''],
        industry: [''],
        form: [''],
        geography: [''],
    },
    isItgood: {
        operatingIncome: 53,
        revenue: 1234,
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CUSTOMER_POINTS:
            return {
                ...state,
                understand: {
                    customers: action.payload,
                },
            };
        case ADD_CUSTOMER_POINT:
            return {
                ...state,
                understand: {
                    ...state.understand,
                    customers: [...state.understand.customers, action.payload],
                },
            };
        default:
            return state;
    }
}
