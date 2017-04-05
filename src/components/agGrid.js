import React, { Component, PropTypes } from 'react'
// import { inject, observer } from 'mobx-react'
// import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

// import Protected from './Protected'
// import DataWrapper from './DataWrapper'
// import CandleChart from './chart'
// import AreaChart from './chart1'
// import LineChart from './chart2'

// import { defaultCellRangeRenderer, Grid, AutoSizer } from 'react-virtualized'

import {AgGridReact} from 'ag-grid-react'

// import './node_modules/ag-grid/dist/styles/ag-grid.css'
// import './node_modules/ag-grid/dist/styles/theme-fresh.css'


// import 'react-virtualized/styles.css'

// @DataWrapper
// @observer
export default class AgGrid extends Component {
  // static propTypes = {
  //   store: PropTypes.shape({
  //     items: PropTypes.object,
  //     chartData: PropTypes.object
  //   })
  // };



  // onRowSelected = () => {
  //   console.log('onRowSelected')
  // }

  columnDefs = [
    {headerName: 'Call ID', field: 'callId'}
  ]

  rowData = [
    {callId: 10},
    {callId: 20},
    {callId: 'testN'}
  ]

	render() {
    // console.log('subpage render');
    // const {items, chartData} = this.props.store;
		return (
			<div className="page posts">
				<h3>Ag-Grid</h3>
				<hr />
        <div className="ag-fresh">
          <AgGridReact

            // listen for events with React callbacks
            // binding to properties within React State or Props
            

            // column definitions and row data are immutable, the grid
            // will update when these lists change
            columnDefs={this.columnDefs}
            rowData={this.rowData}

            // or provide props the old way with no binding
        />
      </div>
    </div>
		)
	}
}
