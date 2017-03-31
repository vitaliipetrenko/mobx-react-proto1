import { observable, action, runInAction } from 'mobx'
import axios from 'axios'

class AppState {
  @observable authenticated = false;
  @observable authenticating = false;
  @observable items = [];
  @observable chartData = [];
  @observable item = {};

  // constructor() {
  //   this.authenticated = false;
  //   this.authenticating = false;
  //   this.items = [];
  //   this.item = {};
  // }


  async fetchData(next) {
    const limit = 300;
    const offset = 300;
    const APIURL = `http://localhost:3000/?limit=${limit}`;

    // let {data} = await axios.get(`https://jsonplaceholder.typicode.com${pathname}`)
    let {data} = await axios.get(APIURL)
    // data = data.results;

    // data.length > 0 ? this.setData(data) : this.setSingle(data)
    this.setOrders(data || []);

    next();
  }

  async fetchChartData() {
    const APIURL = window.location.search.indexOf('random') >= 0 ? 'http://localhost:3000/chart-random' : 'http://localhost:3000/chart';

    let {data} = await axios.get(APIURL)
    data.forEach((el) => {
      el.date = new Date(el.date)
    })
    runInAction(() => this.chartData.replace(data))
  }

  async fetchNextData(pathname, id) {
    const limit = 300;
    const offset = 300;
    const APIURL = `http://localhost:3000/?limit=${limit}&offset=${offset}`;

    // let {data} = await axios.get(`https://jsonplaceholder.typicode.com${pathname}`)
    let {data} = await axios.get(APIURL)
    // data = data.results;

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
  @action setChartData(data) {
    this.chartData = [].concat(data);
  }

  @action setData(data) {
    this.items = data
  }

  @action setSingle(data) {
    this.item = data
  }

  @action clearItems() {
    this.chartData = []
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
