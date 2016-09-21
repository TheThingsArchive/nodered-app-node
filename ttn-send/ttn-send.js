module.exports = function (RED) {
  function TTNSend (config) {
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

    client.on('error', function (err) {
      node.error('Error on connection for TTN application ' + node.appEUI + ': ' + err);
      node.status({
        fill:  'red',
        shape: 'dot',
        text:  'error',
      })
    });

    this.on('input', function (msg) {
      client.downlink(msg.payload.devEUI, new Buffer(msg.payload.payload_raw), msg.payload.ttl || '1h', msg.payload.port || 1)
    })
  }

  RED.nodes.registerType("ttn send", TTNSend)
}
