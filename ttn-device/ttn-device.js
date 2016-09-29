var initNode = require('../lib/init');

module.exports = function(RED) {

  function TTNDevice(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.devId = config.devId;
    node.event = config.event;

    if (!node.event) {
      node.error('No event set');
      return;
    }

    var client = initNode(node, config);

    if (!client) {
      return;
    }

    client.on('device', devId, event, function(devId, data) {
      node.send([{
        devId: devId,
        payload: data
      }]);
    });
  }

  RED.nodes.registerType("ttn device", TTNDevice);
};