import { combineReducers } from 'redux';
import airportChooserDemoReducer from './airport.chooser.demo.reducer';

const rootReducer = combineReducers({
    airportChooserDemoViewModel: airportChooserDemoReducer
});

export default rootReducer;