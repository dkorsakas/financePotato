import {
    ADD_UNDERSTAND_POINT,
    SET_UNDERSTAND_POINTS,
    SET_GOOD_FUTURE_POINTS,
    ADD_GOOD_FUTURE_POINT,
    SET_GOOD_PAST_METRIC,
    SET_GOOD_PAST_METRIC_YEARS,
    SET_BASE_YEAR,
    UPDATE_NOTES,
} from '../types';

const initialState = {
    understand: {
        products: [''],
        customers: [''],
        industry: [''],
        form: [''],
        geography: [''],
        status: [''],
        compensationAndOwnership: [''],
        relatedPartyTransactions: [''],
        shareRepurchases: [''],
        dividends: [''],
    },
    isItGoodPast: {
        baseYear: 2019,
        years: [0],
        operatingIncome: [0],
        operatingIncomeNotes: '',
        cashAndCashEquivalents: [0],
        cashAndCashEquivalentsNotes: '',
        totalAssets: [0],
        totalAssetsNotes: '',
        nonInterestBearingCurrentLiabilities: [0],
        nonInterestBearingCurrentLiabilitiesNotes: '',
        cashFlowFromOperations: [0],
        cashFlowFromOperationsNotes: '',
        maintainenceCapitalExpenditures: [0],
        maintainenceCapitalExpendituresNotes: '',
        numberOfSharesDiluted: [0],
        numberOfSharesDilutedNotes: '',
        totalEquity: [0],
        totalEquityNotes: '',
        intangibleAssets: [0],
        intangibleAssetsNotes: '',
        totalLiabilities: [0],
        totalLiabilitiesNotes: '',
        infilation: [0],
        infilationNotes: '',
        debt: [0],
        debtNotes: 'Used  for caluclating interest coverage ratio',
        interestExpense: [0],
        interestExpenseNotes: 'Used  for caluclating interest coverage ratio',
        currentSharesOutstanding: [0],
        currentSharesOutstandingNotes: '',
        currentSharePrice: [0],
        currentSharePriceNotes: '',
        preferredEquity: [0],
        preferredEquityNotes: '',
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
        case SET_GOOD_PAST_METRIC:
            return {
                ...state,
                isItGoodPast: {
                    ...state.isItGoodPast,
                    [action.payload.goodPastType]:
                        action.payload.goodPastMetric,
                },
            };
        case SET_GOOD_PAST_METRIC_YEARS:
            return {
                ...state,
                isItGoodPast: {
                    ...state.isItGoodPast,
                    [action.payload.goodPastTypeYears]:
                        action.payload.goodPastYears,
                },
            };
        case SET_BASE_YEAR:
            return {
                ...state,
                isItGoodPast: {
                    ...state.isItGoodPast,
                    baseYear: action.payload,
                },
            };
        case UPDATE_NOTES:
            return {
                ...state,
                isItGoodPast: {
                    ...state.isItGoodPast,
                    [action.payload.type]: action.payload.newNotes,
                },
            };

        default:
            return state;
    }
}
