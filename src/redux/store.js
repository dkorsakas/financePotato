import { createStore } from 'redux';
import valueReducer from './reducers/valueReducer';

const store = createStore(valueReducer);

export default store;
