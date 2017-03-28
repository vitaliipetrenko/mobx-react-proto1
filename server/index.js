// const request = require('superagent');
const express = require('express');
const option = require('./option');
const utils = require('./utils');

const CHANGE_PERIOD = 50;
const { createOptionOrdersPool, createOptionOrder, modifyOptionOrdersPool } = option;
let ordersPool = createOptionOrdersPool(1000);

let timer = setTimeout(function intervalFn() {
  // const i = utils.rndInt(ordersPool.length);
  // ordersPool[i] = createOptionOrder();
  ordersPool = modifyOptionOrdersPool(ordersPool);
  timer = setTimeout(intervalFn, CHANGE_PERIOD);
}, 250);

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  let { offset, limit } = req.query;
  offset = parseInt(offset, 10) || 0;
  limit = parseInt(limit, 10) || 200;

  const data = ordersPool.slice(offset, offset + limit);

  res.send(data);
});

app.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server is listening on port 3000');
});
