import { SET_PRODUCTS } from '../types';

const initialState = {
    understand: {
        products: '',
        customers: '',
        industry: '',
        form: '',
        geography: '',
    },
    isItgood: {
        operatingIncome: 53,
        revenue: 1234,
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                understand: {
                    products: '',
                    customers: action.payload,
                    industry: '',
                    form: '',
                    geography: '',
                },
            };
        default:
            return state;
    }
}
