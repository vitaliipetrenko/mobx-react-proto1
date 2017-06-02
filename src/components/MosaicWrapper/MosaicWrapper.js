import React, { Component, PropTypes, PureComponent } from 'react'

// import {
//     // MosaicWindowContext,
//     MosaicTileContext,
//     MosaicWindowContext
// } from 'react-mosaic-component';
// console.log('mosaicActions: ', MosaicTileContext.mosaicActions.toString)

import MosaicPage from '../MosaicPage'; 

export default class MosaicWrapper extends Component {
  // static childContextTypes = {
  //   mosaicActions: PropTypes.func,
  //   mosaicId: PropTypes.func,
  //   getMosaicPath: PropTypes.func,
  //   mosaicWindowActions: PropTypes.func,
  // };
  // constructor(props) {
  //   super(props)
  // }
  // getChildContext() {
  //   return MosaicWindowContext
  // }



  render() {
    return (<MosaicPage/>)
  }
}