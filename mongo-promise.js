const Promise = require('bluebird');
const mongodb = Promise.promisifyAll(require('mongodb'));

const MongoClient = mongodb.MongoClient;
const Collection = mongodb.Collection;
const Cursor = mongodb.Collection;
Promise.promisifyAll(Collection.prototype);
Promise.promisifyAll(MongoClient);
Promise.promisifyAll(Cursor.prototype);

const gdb = mongodb.connectAsync('mongodb://localhost:27017/edm_test')

gdb.then(db => {
  return db.collection('users').find().toArrayAsync()
})
.then(x => {
  console.log(x);
})
.finally(() => {
  gdb.then( x => x.close() )
});
//
