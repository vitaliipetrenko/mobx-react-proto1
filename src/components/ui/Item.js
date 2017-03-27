import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'

import DataWrapper from '../DataWrapper'

@observer @inject('store')
export default class Item extends Component {
  constructor (props) {
    super(props)
    // console.log('this.props: ', this.store.items)
    this.store = this.props.store
  }
  render () {
  // console.log('props.data: ', this.store.items);
  console.log('this.store.items: ', this.store.items);
  
    return (
      <div className='item'>
        {this.store.items.map((post, key) => {
              console.log('post: ', post);
              return <li key={key}>
              <h4>Ticker: {post.ticker}</h4>
              <p>Expiration Date: {post.expirationDate}</p>
              <p>Option Type: {post.optionType}</p>
              <p>Order Type: {post.orderType}</p>
              <p>Price: {post.price}</p>
              <p>Strike: {post.strike}</p>
              <p>Volume: {post.volume}</p>
            </li>
          })}
      </div>
    )
  }
}
