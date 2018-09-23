'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) {
    throw err;
  }

  // start the server if `$ node server.js`
  // if (require.main === module) {
  //   app.start();
  // }
  if (require.main === module) {
    //Comment this app.start line and add following lines
    //app.start();
    app.io = require('socket.io')(app.start());
    require('socketio-auth')(app.io, {
      authenticate: function(socket, value, callback) {
        var AccessToken = app.models.AccessToken;
        //get credentials sent by the client
        var token = AccessToken.find({
          where: {
            and: [{userId: value.userId}, {id: value.id}],
          },
        }, function(err, tokenDetail) {
          if (err) {
            throw err;
          }
          if (tokenDetail.length) {
            callback(null, true);
          } else {
            callback(null, false);
          }
        }); //find function..
      }, //authenticate function..
    });

    setInterval(function() {
      app.io.sockets.emit('message', 'mahendra from server');
    }, 1000);

    app.io.on('connection', (socket) => {
      // Log whenever a user connects
      console.log('user connected');
      // Log whenever a client disconnects from our websocket server
      socket.on('disconnect', function() {
        console.log('user disconnected');
      });
      // When we receive a 'message' event from our client, print out
      // the contents of that message and then echo it back to our client
      // using `io.emit()`
      socket.on('message', (message) => {
        console.log('Message Received: ' + message);
        app.io.emit('message', {type: 'new-message', text: message});
      });
    });
  }
});
