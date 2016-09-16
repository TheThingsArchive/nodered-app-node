module.exports = function (RED) {
  "use strict";

  function TTN (config) {
    RED.nodes.createNode(this, config);

    var node = this

    node.app = config.app;
    node.config = RED.nodes.getNode(node.app);

    var client = node.config.client
    if (!client) {
      node.error('No app set');
      node.status({
        fill:  'red',
        shape: 'dot',
        text:  'error',
      });
      return
    }

    client.on('connect', function () {
      node.log('Connected to TTN application ' + node.appEUI)
      node.status({
        fill:  'green',
        shape: 'dot',
        text:  'connected',
      });
    });

    // get a message from a device
    client.on('uplink', function (msg) {
      var res = {
        payload: msg.fields,
        appEUI: node.appEUI,
        devEUI: msg.devEUI,
        metadata: msg.metadata,
        counter: msg.counter,
      };

      node.send([res, null]);
    });

    client.on('activation', function (msg) {
      var res = {
        payload: msg.devEUI,
      };
      node.send([null, res]);
    });

    client.on('error', function (err) {
      node.error('Error on connection for TTN application ' + node.appEUI + ': ' + err);
      node.status({
        fill:  'red',
        shape: 'dot',
        text:  'error',
      });
    });
  }

   RED.nodes.registerType("ttn", TTN)
}
