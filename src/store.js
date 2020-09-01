import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers';

const store = createStore(rootReducer,applyMiddleware(thunk));
console.log(store.getState());
export default store;