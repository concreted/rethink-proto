rethinkdbdash = require('rethinkdbdash')
processChangefeed = require('rethinkdb-changefeed-reconnect')


var r = rethinkdbdash({servers: {host: 'localhost', port: 28015}, silent: false})
// var r = require('rethinkdbdash')()

function newTasksFeed() {
  return r.db('miralink').table('versions')
    .changes()
    .filter(r.row('version').eq(null))
}

function handleNewTask(task) {
  console.log({task})
}

function handleError(err) {
  console.log(err.stack)
}

processChangefeed(newTasksFeed, handleNewTask, handleError, {
  changefeedName: 'miralink_versions',
  attemptDelay: 3000,
  maxAttempts: 100,
  silent: false,
  logger: global.console,
})



// ========= old stuff =============
// establish connection
// var connection;

// r = require('rethinkdbdash')({
//   pool: false,
//   cursor: true
// });
// r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
//   if (err) throw err;
//   connection = conn;
// })

// // create user account 
// // r = require('rethinkdb')
// // r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
// //   if(err) throw err;
// //   r.db('rethinkdb').table('users').insert({id:"miralink",password:"imamiralink"}).run(conn, function(err,res) {
// //     if (err) throw err;
// //     console.log(res);
// //     r.db('rethinkdb').table('users').run(conn, function(err, res) {
// //       if (err) throw err;
// //       console.log(res);
// //     })
// //   });
// // });


// r.db('miralink').table('versions').changes().run(connection, function(err, cursor) {
//     if (err) throw err;
//     cursor.each(function(err, row) {
//         if (err) throw err;
//         console.log(JSON.stringify(row, null, 2));
//     });
// });