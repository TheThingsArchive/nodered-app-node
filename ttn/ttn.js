module.exports = function (RED) {
  "use strict";

  function TTN (config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.app = config.app;
    node.config = RED.nodes.getNode(node.app);

    var client = node.config.client;
    if (!client) {
      node.error('No app set');
      node.status({
        fill:  'red',
        shape: 'dot',
        text:  'error',
      });
      return;
    }

    client.on('connect', function () {
      node.log('Connected to TTN application ' + node.config.appId);
      node.status({
        fill:  'green',
        shape: 'dot',
        text:  'connected',
      });
    });

    // get a message from a device
    client.on('message', function (devId, msg) {
      node.send([{
        devId: devId,
        payload: msg
      }, null]);
    });

    client.on('activation', function (devId, msg) {
      node.send([null, {
        devId: devId,
        payload: msg
      }]);
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
