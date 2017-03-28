import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'

import { Grid } from 'react-virtualized'
import Item from './Item'
import 'react-virtualized/styles.css'

import DataWrapper from '../DataWrapper'

@observer @inject("store")
export default class ProtoGrid extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store
    console.log('this.store: ', this.store);

  }

    cellRenderer = ({
      columnIndex, // Horizontal (column) index of cell
      isScrolling, // The Grid is currently being scrolled
      isVisible,   // This cell is visible within the grid (eg it is not an overscanned cell)
      key,         // Unique key within array of cells
      parent,      // Reference to the parent Grid (instance)
      rowIndex,    // Vertical (row) index of cell
      style        // Style object to be applied to cell (to position it);
                  // This must be passed through to the rendered cell element.
    }) => {
      
      console.log('rowIndex: ', rowIndex);
      console.log('columnIndex: ', columnIndex);
      console.log('this.props.data: ', this.props.data);
      
      
      
      const itemContent = 
      this.props.data && 
      this.props.data.length ? 
      this.props.data.map((post, key) => {
        console.log('post: ', post)
      }): 'Loading...';

      if (itemContent) {
        console.log('this.props.data.length: ', this.props.data.length);
        
      }

      // If cell content is complex, consider rendering a lighter-weight placeholder while scrolling.
      const content = isScrolling
        ? '...'
        : <Item data={this.props.data} />
        
      return (
        <div
          key={key}
          style={style}
        >
          {content}
        </div>
      )
    }

  render() {
    return (
      <Grid
        cellRenderer={this.cellRenderer}
        columnCount={2}
        columnWidth={140}
        height={300}
        rowCount={3}
        rowHeight={30}
        width={900}
      />
    )
  }
}