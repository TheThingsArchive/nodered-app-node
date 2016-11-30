var ttn = require('ttn');

module.exports = function(RED) {
  "use strict";

  function TTNConfig(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.appId = config.appId;
    node.accessKey = config.accessKey;
    node.region = config.region;

    if (!node.appId || !node.accessKey || !node.region) {
      node.error('No appId, accessKey or region set');
      return;
    }

    node.client = new ttn.Client(node.region, node.appId, node.accessKey);

    node.client.on('connect', function() {
      node.log('Connected to TTN application ' + node.appId);
    });

    node.client.on('error', function(err) {
      node.error('Error on connection for TTN application ' + node.appId + ': ' + err);
    });

    node.on('close', function(done) {
      node.log('Closing connection to TTN application ' + node.appId);
      node.client.end();
      done();
    });
  }

  RED.nodes.registerType('ttn app', TTNConfig);
};