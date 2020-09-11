import { createStore } from 'redux';
import valueReducer from './reducers/valueReducer';

const initialState = {};

const store = createStore(
    valueReducer,
    initialState + window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
