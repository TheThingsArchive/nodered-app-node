var initNode = require('../lib/init');

module.exports = function(RED) {

  function TTNEvent(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.dev_id = config.dev_id || "+";
    node.event = config.event;

    if (!node.event) {
      node.error('No event set');
      return;
    }

    var client = initNode(RED, node, config);

    if (!client) {
      return;
    }

    client.then(function (client) {
      client.on('events', node.dev_id, node.event, function(dev_id, data) {
        node.send([{
          dev_id: dev_id,
          payload: data
        }]);
      });
    });
  }

  RED.nodes.registerType("ttn event", TTNEvent);
};
