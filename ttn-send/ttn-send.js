var initNode = require('../lib/init');

module.exports = function(RED) {

  function TTNSend(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.devId = config.devId;
    node.port = config.port ? parseInt(config.port, 10) : null;
    
    var client = initNode(RED, node, config);

    if (!client) {
      return;
    }

    this.on('input', function(msg) {
      var devId = msg.devId || node.devId;

      if (!devId) {
        node.error('No devId set');
        return;
      }

      client.send(devId, msg.payload, msg.port || node.port);
    });
  }

  RED.nodes.registerType("ttn send", TTNSend);
};