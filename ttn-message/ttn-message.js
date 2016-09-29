var initNode = require('../lib/init');

module.exports = function(RED) {

  function TTNMessage(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.devId = config.devId;
    node.field = config.field;

    var client = initNode(node, config);

    if (!client) {
      return;
    }

    client.on('message', node.devId, node.field, function(devId, data) {
      data.devId = devId;
      data.payload = data.payload_fields || data.payload_raw;
      node.send([data]);
    });
  }

  RED.nodes.registerType("ttn message", TTNMessage);
};