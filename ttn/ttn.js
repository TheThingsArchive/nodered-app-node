module.exports = function (RED) {
  function TTN (config) {
    RED.nodes.createNode(this, config);

    var node = this;
    node.appId = config.appId;
    node.accessKey = config.accessKey;
    node.region = config.region;

    var ttn = require('ttn');

    var client = new ttn.Client(node.region, node.appId, node.accessKey);

    client.on('connect', function () {
      node.log('Connected to TTN application ' + node.appId);
      node.status({
        fill:  'green',
        shape: 'dot',
        text:  'connected',
      });
    });

    // get a message from a device
    client.on('message', function (msg) {
      msg.app_id = node.appId;
      node.send([res, null]);
    });

    client.on('activation', function (msg) {
      node.send([null, msg]);
    });

    client.on('error', function (err) {
      node.error('Error on connection for TTN application ' + node.appId + ': ' + err);
      node.status({
        fill:  'red',
        shape: 'dot',
        text:  'error',
      });
    });

    // clean up
    this.on('close', function (done) {
      node.log('closing connection');
      node.status({
        fill:  'grey',
        shape: 'dot',
        text:  'disconnected',
      });
      client.end();
      done();
    });

  }

  // return TTN();
   RED.nodes.registerType("ttn", TTN);
};
