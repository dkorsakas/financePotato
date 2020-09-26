import { combineReducers, createStore } from 'redux';
import understandReducer from './reducers/understandReducer';

// function saveToLocalStorage(state) {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('state', serializedState);
//     } catch (e) {
//         console.log(e);
//     }
// }

// function loadFromLocalStorage() {
//     try {
//         const serializedState = localStorage.getItem('state');
//         if (serializedState === null) return undefined;
//         return JSON.parse(serializedState);
//     } catch (e) {
//         console.log(e);
//         return undefined;
//     }
// }
//const persistedState = loadFromLocalStorage();

const store = createStore(
    understandReducer,
    //persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//store.subscribe(() => saveToLocalStorage(store.getState()));

//tutorials regarding saving redux state
//https://www.youtube.com/watch?v=o_Ni4Cqh4XA&ab_channel=devmentorlive
//https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
//https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

export default store;
