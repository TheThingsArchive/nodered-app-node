module.exports = function (RED) {
  "use strict";

  function TTN (config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.app = config.app;
    node.config = RED.nodes.getNode(node.app);

    if (!node.config || !node.config.client) {
      node.error('No app set');
      node.status({
        fill:  'red',
        shape: 'dot',
        text:  'error',
      });
      return;
    }

    var client = node.config.client;

    client.on('connect', function () {
      node.log('Connected to TTN application ' + node.config.appId);
      node.status({
        fill:  'green',
        shape: 'dot',
        text:  'connected',
      });
    });

    client.on('message', function (devId, msg) {
      msg.devId = devId;
      msg.payload = msg.payload_fields || msg.payload_raw;
      node.send([msg, null]);
    });

    client.on('activation', function (devId, msg) {
      msg.devId = devId;
      msg.payload = devId;
      node.send([null, msg]);
    });

    client.on('error', function (err) {
      node.error('Error on connection for TTN application ' + node.config.appId + ': ' + err);
      node.status({
        fill:  'red',
        shape: 'dot',
        text:  'error',
      });
    });
  }

   RED.nodes.registerType("ttn", TTN);
};
