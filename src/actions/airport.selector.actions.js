import {
    FETCH_ALL_AIRPORTS_ERROR,
    FETCH_ALL_AIRPORTS_SUCCESS,
    LOADING_AIRPORTS,
    FILTER_AIRPORTS_SUCCESS,
    LOAD_MORE_SUCCESS,
    SET_SELECTED_AIRPORT
} from './airport.selector.action.types';
import { findAll, filterAirportData , findTotalRecords } from '../services/airport.service';

const fetchAllAirports = (isDisplayFilter, term, pageIndex, pageSize) => {
    return dispatch => {
        dispatch(loading());
        findAll().then((response) => {
            if (isDisplayFilter) {
                filterAirportData(term, pageIndex, pageSize, response).subscribe((filterResult) => {
                    dispatch(fetchAllSuccess({ data: response, filterData: filterResult , 
                                            totalRecords: findTotalRecords(response,term),
                                            airportFilterConfig : findDisplayConfig(term, pageIndex, pageSize) }));
                });
            } else {
                dispatch(fetchAllSuccess({ data: response, filterData: [] , 
                                        totalRecords: response.length,
                                        airportFilterConfig : findDisplayConfig(term, pageIndex, pageSize) }));
            }
        },
            (error) => {
                dispatch(fetchAllError(error.message));
            });
    }
};

const filterAirports = (term = '', pageIndex = 0, pageSize = 0, allAirportData) => {
    return dispatch => {
        filterAirportData(term, pageIndex, pageSize, allAirportData).subscribe((filterResult) => {
            dispatch(fetchFilterSuccess({ data: filterResult , 
                                        totalRecords: findTotalRecords(allAirportData,term),
                                        airportFilterConfig : findDisplayConfig(term, pageIndex, pageSize) }));
        });
    }
}

const loadMoreAirports = (term = '', pageIndex = 0, pageSize = 0, allAirportData) => {
    return dispatch => {
        filterAirportData(term, pageIndex, pageSize, allAirportData).subscribe((filterResult) => {
            dispatch(fetchLoadMoreSuccess({ data: filterResult , 
                                        totalRecords: findTotalRecords(allAirportData,term),
                                        airportFilterConfig : findDisplayConfig(term, pageIndex, pageSize) }));
        });
    }
}

const fetchAllSuccess = (data) => ({
    type: FETCH_ALL_AIRPORTS_SUCCESS,
    payload: {
        ...data
    }
});

const fetchFilterSuccess = (data) => ({
    type: FILTER_AIRPORTS_SUCCESS,
    payload: {
        ...data
    }
});

const fetchLoadMoreSuccess = (data) => ({
    type: LOAD_MORE_SUCCESS,
    payload: {
        ...data
    }
});

const fetchAllError = (error) => ({
    type: FETCH_ALL_AIRPORTS_ERROR,
    payload: {
        ...error
    }
});

const loading = () => ({
    type: LOADING_AIRPORTS,
    payload: {}
});

const findDisplayConfig = (term, pageIndex, pageSize) => {
    const airportFilterConfig = {
        pageSize: pageSize,
        searchTerm: term,
        pageIndex: pageIndex        
    };
    return airportFilterConfig;
}

// const findResponseObject = () => {
//     return { data: response, filterData: filterResult , 
//             totalRecords: findTotalRecords(response,term),
//             airportFilterConfig : findDisplayConfig(term, pageIndex, pageSize) }
// }

const setSelectedAirport = (item) => {
    return dispatch => {
        dispatch(mapSelectedAirportSuccess({ data : item }))
    }
}

const mapSelectedAirportSuccess = (data) => ({
    type: SET_SELECTED_AIRPORT,
    payload: {
        ...data
    }
});

export {
    fetchAllAirports,
    filterAirports,
    loadMoreAirports,
    setSelectedAirport
}
