import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import Protected from '../Protected'
import DataWrapper from '../DataWrapper'

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
    const width = 690;
    const height = 500;
    const {items, chartData} = this.props.store;
    const { className } = this.props
    // console.log('className: ', className)
		return (
			<div>
      {
         items.length ?
          <Grid
            className={"grid " + className}
            cellRenderer={this.cellRenderer(items)}
            columnCount={Object.keys(items[0]).length}
            columnWidth={this._getColumnWidth}
            height={height}
            rowCount={items.length}
            rowHeight={30}
            width={width}
          />
          :
          <div>empty</div>
      }
        
			</div>
		)
	}
}
