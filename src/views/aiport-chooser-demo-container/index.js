import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchAllAirports, filterAirports, loadMoreAirports, setSelectedAirport } from '../../actions/airport.selector.actions';
import DropdownWidget from '../../widget/dropdown';
import TextBoxWidget from '../../widget/textbox';
import ButtonWidget from "../../widget/button";
import './airport.chooser.container.css';

class AirportChooserContainerComponent extends Component {
    constructor(props) {
        super(props);
    }

    handleLoadAll = () => {
        const config = this.props.airportFilterConfig;
        this.props.loadAllAirports(this.props.isDisplayFilter, '', 0, config.pageSize);
    }

    handleFilterAirportChange = (term) => {
        const config = this.props.airportFilterConfig;
        const pageIndex = 0;
        this.props.filterMyAirports(term, pageIndex, config.pageSize, this.props.airportData);
    }

    handleLoadMore = () => {
        const config = this.props.airportFilterConfig;
        const pageIndex = config.pageIndex + 1;
        this.props.loadMoreAirports(config.searchTerm, pageIndex, config.pageSize, this.props.airportData);
    }

    displaySelectedItem = (item) => {
        console.log(item);
        this.props.bindSelectedAirport(item);
    }

    renderDropdown = () => {
        let dropdownButton;
        if (this.props.isLoadingAirports) {
            dropdownButton = <div className='airport-loader-panel'><h2>loading...</h2></div>;
        } else {
            if (this.props.isDisplayFilter && this.props.isSuccessfullyFetched) {
                const loadMoreDiv = <div className="load-more-link" onClick={this.handleLoadMore}>Load more</div>
                let loadmore = (this.props.totalRecords > ((this.props.airportFilterConfig.pageSize * this.props.airportFilterConfig.pageIndex) + this.props.airportFilterConfig.pageSize)) ? loadMoreDiv : null;
                dropdownButton = <div>
                    <TextBoxWidget onFilterChange={this.handleFilterAirportChange} placeholderName="Enter name, city or country..."></TextBoxWidget>
                    <DropdownWidget onItemSelect={this.displaySelectedItem} myClassName="airport-list-item" data={this.props.airportFilteredData}></DropdownWidget>
                    {loadmore}
                </div>;
            } else {
                dropdownButton = <DropdownWidget myClassName="airport-list-item" data={this.props.airportData}></DropdownWidget>;
            }
        }
        return dropdownButton;
    }

    rednerSelectedAirport = () => {
        let airportInfo = null;
        if(this.props.selectedAirport) {
            airportInfo = <div><label>{this.props.selectedAirport.name}</label></div>
        }
        else{
            airportInfo = <div><label className="airport-not-selected-label">Airport not selected...</label></div> 
        }
        return airportInfo;
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-8">
                        <h1>React Component Demo</h1>                        
                    </div>
                    <div className="col-4 selected-ariport-container">
                           {this.rednerSelectedAirport()}          
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ButtonWidget myClass="airport-button" title="Load Airports" onLoadAirports={this.handleLoadAll}></ButtonWidget>
                        <div className="airport-list-container">
                            {this.renderDropdown()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoadingAirports: state.airportChooserDemoViewModel.isLoadingAirports,
        airportData: state.airportChooserDemoViewModel.airportData,
        airportFilteredData: state.airportChooserDemoViewModel.airportFilteredData,
        selectedAirport: state.airportChooserDemoViewModel.selectedAirport,
        currentPageIndex: state.airportChooserDemoViewModel.currentPageIndex,
        isSuccessfullyFetched: state.airportChooserDemoViewModel.isSuccessfullyFetched,
        isDisplayFilter: state.airportChooserDemoViewModel.isDisplayFilter,
        airportFilterConfig: state.airportChooserDemoViewModel.airportFilterConfig,
        totalRecords: state.airportChooserDemoViewModel.totalRecords
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadAllAirports: (isDisplayFilter, term, pageIndex, pageSize) => {
            dispatch(fetchAllAirports(isDisplayFilter, term, pageIndex, pageSize));
        },
        filterMyAirports: (term, pageIndex, pageSize, allAirports) => {
            dispatch(filterAirports(term, pageIndex, pageSize, allAirports));
        },
        loadMoreAirports: (term, pageIndex, pageSize, allAirports) => {
            dispatch(loadMoreAirports(term, pageIndex, pageSize, allAirports));
        },
        bindSelectedAirport: (selectedItem) => {
            dispatch(setSelectedAirport(selectedItem));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AirportChooserContainerComponent);