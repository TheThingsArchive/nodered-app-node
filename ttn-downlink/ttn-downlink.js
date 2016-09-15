
module.exports = function (RED) {
  function TTNDownlink (config) {
    RED.nodes.createNode(this, config);

    var node = this;
    node.appEUI = config.appEUI;
    node.devEUI = config.devEUI;
    node.accessKey = config.accessKey;
    node.broker = config.broker;

    var ttn = require('ttn')

    var client = new ttn.Client(node.broker, node.appEUI, node.accessKey)

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

    this.on('close', function (done) {
      node.log('closing connection');
      node.status({
        fill:  'grey',
        shape: 'dot',
        text:  'disconnected',
      });
      client.end();
      done();
    })

    this.on('input', function (msg) {
      client.downlink(node.devEUI, new Buffer(msg.payload.payload_raw), msg.payload.ttl || 5, msg.payload.port || 1)
    })
  }

  RED.nodes.registerType("ttn downlink", TTNDownlink)
}
