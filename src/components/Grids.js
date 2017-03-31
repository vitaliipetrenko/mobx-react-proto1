import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import DataWrapper from './DataWrapper'
import CandleChart from './chart'
import AreaChart from './chart1'
import LineChart from './chart2'

import { defaultCellRangeRenderer, Grid, AutoSizer } from 'react-virtualized'

import 'react-virtualized/styles.css'

@DataWrapper
@observer
export default class Grids extends Component {
  static propTypes = {
    store: PropTypes.shape({
      items: PropTypes.object,
      chartData: PropTypes.object
    })
  };

  cellRenderer = (items) => ({ columnIndex, key, rowIndex, style }) => {
    const rowItem = items[rowIndex];
    const keys = Object.keys(rowItem);

    let content = rowItem[keys[columnIndex]]

    return <span key={key} style={style}>{content}</span>
  };

  _getColumnWidth = ({ index }) => {
    switch (index) {
      case 0:
        return 310
      case 1:
        return 50
      case 2:
        return 50
      case 3:
        return 100
      case 4:
        return 40
      case 5:
        return 40
      default:
        return 40
    }
  }

  render() {
    // console.log('subpage render');
    const width = 690;
    const height = 500;
    const {items, chartData} = this.props.store;
		return (
			<div className="page grid-wrapper">
        {items.length &&
          <div className="grids">
            <Grid
              className="grid grid1"
              cellRenderer={this.cellRenderer(items)}
              columnCount={Object.keys(items[0]).length}
              columnWidth={this._getColumnWidth}
              height={height}
              rowCount={items.length}
              rowHeight={30}
              width={width}
            />
            <Grid
              className="grid grid2"
              cellRenderer={this.cellRenderer(items)}
              columnCount={Object.keys(items[0]).length}
              columnWidth={this._getColumnWidth}
              height={height}
              rowCount={items.length}
              rowHeight={30}
              width={width}
          />
          <Grid
              className="grid grid3"
              cellRenderer={this.cellRenderer(items)}
              columnCount={Object.keys(items[0]).length}
              columnWidth={this._getColumnWidth}
              height={height}
              rowCount={items.length}
              rowHeight={30}
              width={width}
          />
          <Grid
              className="grid grid4"
              cellRenderer={this.cellRenderer(items)}
              columnCount={Object.keys(items[0]).length}
              columnWidth={this._getColumnWidth}
              height={height}
              rowCount={items.length}
              rowHeight={30}
              width={width}
          />
          </div>
        }
			</div>
		)
	}
}
