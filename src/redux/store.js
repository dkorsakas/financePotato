import { createStore } from 'redux';
import understandReducer from './reducers/understandReducer';

const initialState = {};

const store = createStore(
    understandReducer,
    initialState + window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
