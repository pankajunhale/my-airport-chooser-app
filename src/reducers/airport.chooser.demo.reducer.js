import {
    FETCH_ALL_AIRPORTS_ERROR,
    FETCH_ALL_AIRPORTS_SUCCESS,
    LOADING_AIRPORTS,
    FILTER_AIRPORTS_SUCCESS,
    LOAD_MORE_SUCCESS
} from '../actions/airport.selector.action.types';

const INITIAL_STATE = {
    isLoadingAirports: false,
    airportData: [],
    airportFilteredData: [],
    selectedAirport: null,
    currentPageIndex: 0,
    isSuccessfullyFetched: null,
    isDisplayFilter: true, // fetching or displaying data in chunk...
    totalRecords: 0,
    airportFilterConfig: {
        pageSize: 10,
        searchTerm: '',
        pageIndex: 0
    }
}
export default function airportChooserDemoReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING_AIRPORTS:
            return {
                ...state,
                isLoadingAirports: true,
            }
        case FETCH_ALL_AIRPORTS_SUCCESS:
            let airportFilterList = [];
            if (state.isDisplayFilter) {
                airportFilterList = [...action.payload.filterData];
            }
            return {
                ...state,
                airportData: [...action.payload.data],
                airportFilteredData: airportFilterList,
                isLoadingAirports: false,
                isSuccessfullyFetched: true,
                airportFilterConfig: Object.assign({}, action.payload.airportFilterConfig),
                totalRecords: action.payload.totalRecords
            }
        case FETCH_ALL_AIRPORTS_ERROR:
            return {
                ...state,
                isLoadingAirports: false
            }
        case FILTER_AIRPORTS_SUCCESS:
            return {
                ...state,
                airportFilteredData: [...action.payload.data],
                airportFilterConfig: Object.assign({}, action.payload.airportFilterConfig),
                totalRecords: action.payload.totalRecords
            }
        case LOAD_MORE_SUCCESS:
            return {
                ...state,
                airportFilteredData: [...state.airportFilteredData,...action.payload.data],
                airportFilterConfig: Object.assign({}, action.payload.airportFilterConfig),
                totalRecords: action.payload.totalRecords
            }
        default:
            return state;
    }
} 