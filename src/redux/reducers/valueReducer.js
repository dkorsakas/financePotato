import { SET_PRODUCTS } from '../types';

const initialState = {
    understand: {
        products: '',
        customers: ['cusotmer bullet 1', 'bullet 2'],
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
                understand: state.understand.customers.push(action.payload),
            };
        default:
            return state;
    }
}
