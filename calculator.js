const Promise = require('bluebird');
const request = require('superagent-bluebird-promise');
const _ = require('lodash');

function slowAdd2Numbers() {
  return request.get('http://localhost:9999/slowadd/9')
    .then(res => {
      console.log(res.body);
    })
    .then(() => {
      return request.get('http://localhost:9999/slowadd/10');
    })
    .then(res => {
      console.log(res.body);
    });
}

// slowAdd2Numbers()

function slowMapAdd() {
  const data = _.range(10);
  const makeURL = (x) => 'http://localhost:9999/slowadd/' + x;

  return Promise.map(data, x => {
    return request.get(makeURL(x)).then(x => x.body);
  })
  .then(x => {
    console.log(x);
  });
}
// slowMapAdd()
const makeURL = (x) => 'http://localhost:9999/slowadd/' + x;
const getData = (x) => request.get(makeURL(x)).then(x => x.body);

function slowMapAdd2() {
  const data = _.range(10);

  // this returns array of promises
  const makeAllPromises = () => data.map(getData);
  // Promise.all/resolve/try/props
  // return Promise.try(makeAllPromises).all().then(x => console.log(x));
  return Promise.all(makeAllPromises()).then(x => console.log(x));
}
//slowMapAdd2().then(x => console.log('YEAH'));


function slowProps() {
  const obj = {
    ham: getData(10), //promise
    aj: getData(11), //promise
  };
  return Promise.props(obj).then(x => console.log(x))
}
//slowProps().then(x => console.log('YEAH'));

function slowProps2() {
  const obj = {
    ham: getData(10), //promise
    aj: getData(11), //promise
  };
  return Promise.props(obj)
  .then(x => console.log(x))
  .catch(e => console.log(e))
  .finally(() => console.log('helloooo'))
}
slowProps2().then(x => console.log('YEAH'));

// Promise.resolve(1)
//   .then(x => x + 5)
//   .then(x => 2 * x)
//   .then(x => console.log(x));

// -----------1 -

// [2, 3, 4, 5]
// [2*2, 3*2, 4*2, 5*2] ---> max

// get(url1, ()=>{
//   get(url2, ()=>{
//     get(url3, ()=>{
//
//     })
//   })
// })
