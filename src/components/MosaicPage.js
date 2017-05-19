import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
// import { computed } from 'mobx';

import { Mosaic } from 'react-mosaic-component'

import Protected from './Protected'
// import DataWrapper from './DataWrapper'
import '../../node_modules/react-mosaic-component/react-mosaic-component.css'

import Grids from '../components/Grids/Grids'

class ElementMosaic extends Mosaic { }

// @DataWrapper
@observer
export default class MosaicPage extends Component {
  // static propTypes = {
  //   store: PropTypes.shape({
  //     items: PropTypes.object,
  //     chartData: PropTypes.object
  //   })
  // };

          // <Grids
          //   className="grid1"
          // />
          // <Grids
          //   className="grid2"
          // />
          // <Grids
          //   className="grid3"
          // />

  render() {
    // const {items, chartData} = this.props.store;
    // console.log('s: ')
    return (
      <div className="step">
        <ElementMosaic
            renderTile={ e => e }
            initialValue={{
              direction: 'row',
              first: <div>Top Right Window</div>,
              second: {
                  direction: 'column',
                  first: <div>Top Right Window</div>,
                  second: <div>Bottom Right Window</div>
              }
            }}
          />
      </div>
    )
  }
}
