var initNode = require('../lib/init');

module.exports = function(RED) {

  function TTNMessage(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.devId = config.devId;
    node.field = config.field;

    var client = initNode(RED, node, config);

    if (!client) {
      return;
    }

    client.on('message', node.devId, node.field, function(devId, data) {
      var msg = node.field ? {} : data;
      msg.devId = devId;
      msg.payload = node.field ? data : (data.payload_fields || data.payload_raw);
      node.send([msg]);
    });
  }

  RED.nodes.registerType("ttn message", TTNMessage);
};