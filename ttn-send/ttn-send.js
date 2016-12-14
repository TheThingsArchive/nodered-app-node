var initNode = require('../lib/init');

module.exports = function(RED) {

  function TTNSend(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.dev_id = config.dev_id;
    node.port = config.port ? parseInt(config.port, 10) : null;
    
    var client = initNode(RED, node, config);

    if (!client) {
      return;
    }

    this.on('input', function(msg) {
      var dev_id = msg.dev_id || node.dev_id;

      if (!dev_id) {
        node.error('No dev_id set');
        return;
      }

      client.send(dev_id, msg.payload, msg.port || node.port);
    });
  }

  RED.nodes.registerType("ttn send", TTNSend);
};