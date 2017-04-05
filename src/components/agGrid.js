import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { computed, autorun, observable, toJS } from 'mobx';
import { Match, Link } from 'react-router-dom'

// import Protected from './Protected'
import DataWrapper from './DataWrapper'
// import CandleChart from './chart'
// import AreaChart from './chart1'
// import LineChart from './chart2'

// import { defaultCellRangeRenderer, Grid, AutoSizer } from 'react-virtualized'

import {AgGridReact} from 'ag-grid-react'




// import 'react-virtualized/styles.css'

@DataWrapper
@observer
export default class AgGrid extends Component {
  static propTypes = {
    store: PropTypes.shape({
      items: PropTypes.object,
      // chartData: PropTypes.object
    })
  };

    constructor(props) {
      super(props)
      this.state = {
        rowData: {}
      }
      autorun(() => {
        // setInterval(() => {
          // this.getRowData
          // this.rowData = this.props.store.items
          // this.setState(
            // {rowData: this.rowData}
          // )
          // console.log('this.rowData: ', this.state.rowData)
        // }, 250)
      });
    }

    // @observable rowData = {};


// @computed get getRowData() {
//     // pure computation
//     return this.props.store.items
//   }


  // onRowSelected = () => {
  //   console.log('onRowSelected')
  // }

  columnDefs = [
    { headerName: 'Call ID', field: 'id' },
    { headerName: 'expiration Date', field: 'expirationDate' },
    { headerName: 'option Type', field: 'optionType' },
    { headerName: 'order Type', field: 'orderType' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Strike', field: 'strike' },
    { headerName: 'Ticker', field: 'ticker' },
    { headerName: 'Volume', field: 'volume' },
  ]

  // rowData = [
  //   {id: 10},
  //   {id: 20},
  //   {id: 'testN'}
  // ]
  onGridReady({api}) {
    //  setInterval(() => {
    //    console.log('sd: ')
    //   // api.refreshView()
    //   // this.forceUpdate()
    //     }, 250)

  }
	render() {
    // console.log('subpage render');
    const {items} = this.props.store;
    // console.log('items: ', items)
		return (
			<div className="">
				<h3>Ag-Grid</h3>
				<hr />
          {items.length &&
        <div className="grids">
          <div style={{height: '300px'}} className="ag-fresh grid">
            <AgGridReact
              onGridReady={this.onGridReady.bind(this)}
              columnDefs={this.columnDefs}
              rowData={toJS(items)}
              enableColResize="true"
              enableSorting="true"
              enableFilter="true"
              groupHeaders="true"
            />
          </div>
          <div style={{height: '300px'}} className="ag-fresh grid">
            <AgGridReact
              onGridReady={this.onGridReady.bind(this)}
              columnDefs={this.columnDefs}
              rowData={toJS(items)}
              enableColResize="true"
              enableSorting="true"
              enableFilter="true"
              groupHeaders="true"
            />
          </div>
          <div style={{height: '300px'}} className="ag-fresh grid">
            <AgGridReact
              onGridReady={this.onGridReady.bind(this)}
              columnDefs={this.columnDefs}
              rowData={toJS(items)}
              enableColResize="true"
              enableSorting="true"
              enableFilter="true"
              groupHeaders="true"
            />
          </div>
          <div style={{height: '300px'}} className="ag-fresh grid">
            <AgGridReact
              onGridReady={this.onGridReady.bind(this)}
              columnDefs={this.columnDefs}
              rowData={toJS(items)}
              enableColResize="true"
              enableSorting="true"
              enableFilter="true"
              groupHeaders="true"
            />
          </div>
      </div>
          }
    </div>
		)
	}
}
