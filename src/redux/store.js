import { combineReducers, createStore } from 'redux';
import tableHeaderReducer from './HeaderReducer';
import itemsReducer from './TableItemsReducer';


let reducers = combineReducers({
    tableItems: itemsReducer,
    headerActions: tableHeaderReducer
});

let store = createStore(reducers);

window.store = store;

export default store;