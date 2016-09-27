module.exports = function (RED) {
  function TTNSend (config) {
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

    client.on('error', function (err) {
      node.error('Error on connection for TTN application ' + node.config.appId + ': ' + err);
      node.status({
        fill:  'red',
        shape: 'dot',
        text:  'error',
      });
    });

    this.on('input', function (msg) {
      client.downlink(msg.payload.devId, new Buffer(msg.payload.payload), msg.payload.port || 1);
    });
  }

  RED.nodes.registerType("ttn send", TTNSend);
};
