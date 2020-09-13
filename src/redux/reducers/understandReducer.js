import {
    ADD_UNDERSTAND_POINT,
    SET_UNDERSTAND_POINTS,
    SET_GOOD_FUTURE_POINTS,
    ADD_GOOD_FUTURE_POINT,
} from '../types';

const initialState = {
    understand: {
        products: [''],
        customers: [''],
        industry: [''],
        form: [''],
        geography: [''],
        status: [''],
    },
    isItGoodPast: {
        operatingIncome: 53,
        revenue: 1234,
    },
    isItGoodFuture: {
        breathAnalysis: ['Customers:', 'Suppliers:'],
        forcesAnalysis: [
            'Bargaining power of customers:',
            'Bargaining power of suppliers:',
            'Threat of substitutes',
            'Threat of new entrants',
        ],
        moatIdentification: ['Moats:'],
        marketGrowth: ['Growth:'],
    },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_UNDERSTAND_POINTS:
            return {
                ...state,
                understand: {
                    ...state.understand,
                    [action.payload.understandType]:
                        action.payload.understandPoints,
                },
            };
        case ADD_UNDERSTAND_POINT:
            return {
                ...state,
                understand: {
                    ...state.understand,
                    [action.payload.understandType]: [
                        ...state.understand[action.payload.understandType],
                        action.payload.understadPoint,
                    ],
                },
            };
        case SET_GOOD_FUTURE_POINTS:
            return {
                ...state,
                isItGoodFuture: {
                    ...state.isItGoodFuture,
                    [action.payload.understandType]:
                        action.payload.understandPoints,
                },
            };
        case ADD_GOOD_FUTURE_POINT:
            return {
                ...state,
                isItGoodFuture: {
                    ...state.isItGoodFuture,
                    [action.payload.understandType]: [
                        ...state.isItGoodFuture[action.payload.understandType],
                        action.payload.understadPoint,
                    ],
                },
            };
        default:
            return state;
    }
}
