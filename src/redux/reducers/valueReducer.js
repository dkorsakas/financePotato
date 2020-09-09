import { SET_PRODUCTS } from '../types';

const initialState = {
    customers: {
        products: '',
        customers: '',
        industry: '',
        form: '',
        geography: '',
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                customers: { proucts: 'hello' },
            };
        default:
            return state;
    }
}
