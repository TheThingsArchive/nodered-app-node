var initNode = require('../lib/init');

module.exports = function(RED) {

  function TTNMessage(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.dev_id = config.dev_id;
    node.field = config.field;

    var client = initNode(RED, node, config);

    if (!client) {
      return;
    }

    client.on('message', node.dev_id, node.field, function(dev_id, data) {
      var msg = node.field ? {} : data;
      msg.dev_id = dev_id;
      msg.payload = node.field ? data : (data.payload_fields || data.payload_raw);
      node.send([msg]);
    });
  }

  RED.nodes.registerType("ttn message", TTNMessage);
};