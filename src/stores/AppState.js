import { observable, action, runInAction } from 'mobx'
import axios from 'axios'
import OrderModel from '../models/OrderModel';

class AppState {
  @observable authenticated = false;
  @observable authenticating = false;
  @observable items = [];
  @observable item = {};

  // constructor() {
  //   this.authenticated = false;
  //   this.authenticating = false;
  //   this.items = [];
  //   this.item = {};
  // }

  @action async fetchData(next = () => {}) {
    const APIURL = 'http://localhost:3000/?limit=1000';

    try {
      let {data} = await axios.get(APIURL)
      // this.setOrders(data);
      runInAction(() => this.items.replace(data))
    } catch (e) {
      // this.setOrders([]);
      runInAction(() => this.items.replace([]))
    }

    next();
  }

  @action setOrders(data) {
    // this.items = data.map(item => new OrderModel(item));
    this.items.replace(data);
  }

  @action setData(data) {
    this.items = data
  }

  @action setSingle(data) {
    this.item = data
  }

  @action clearItems() {
    this.items = []
    this.item = {}
  }

  @action authenticate() {
    return new Promise((resolve,reject) => {
          this.authenticating = true
          setTimeout(() => {
            this.authenticated = !this.authenticated
            this.authenticating = false
            resolve(this.authenticated)
        }, 0)
    })
  }

}

export default AppState;
