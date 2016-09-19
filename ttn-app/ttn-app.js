module.exports = function (RED) {
  "use strict";
  var ttn = require('ttn');

  function TTNConfig (config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.appEUI = config.appEUI;
    node.accessKey = config.accessKey;
    node.broker = config.broker;

    node.client = new ttn.Client(node.broker, node.appEUI, node.accessKey)

    // clean up
    node.on('close', function (done) {
      node.log('closing connection');
      node.client.end();
      done();
    })

  }

  RED.nodes.registerType('ttn app', TTNConfig);
}
