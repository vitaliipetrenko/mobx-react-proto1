import { observable, action } from 'mobx'
import axios from 'axios'

class AppState {
  @observable authenticated = false;
  @observable authenticating = false;
  @observable items = [];
  @observable item = {};

  // constructor() {
  //   this.authenticated = false
  //   this.authenticating = false
  //   this.items = []
  //   this.item = {}
  // }

  async fetchData(pathname, id) {
    const limit = 300;
    const offset = 300;
    const APIURL = 'http://localhost:3000/';

    // let {data} = await axios.get(`https://jsonplaceholder.typicode.com${pathname}`)
    let {data} = await axios.get(APIURL)
    // data = data.results;

    // data.length > 0 ? this.setData(data) : this.setSingle(data)
    this.setOrders(data || []);
  }

  async fetchNextData(pathname, id) {
    const limit = 300;
    const offset = 300;
    const APIURL = `http://localhost:3000/?limit=${limit}&offset=${offset}`;
    
    // let {data} = await axios.get(`https://jsonplaceholder.typicode.com${pathname}`)
    let {data} = await axios.get(APIURL)
    // data = data.results;

    // data.length > 0 ? this.setData(data) : this.setSingle(data)
    this.setOrders(data || []);
  }

  @action setOrders(data) {
    this.items = [].concat(data);
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
