var initNode = require('../lib/init');

module.exports = function(RED) {

  function TTNDownlink(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.dev_id = config.dev_id;
    node.port = config.port ? parseInt(config.port, 10) : null;
    node.confirmed = config.confirmed || false;
    node.schedule = config.schedule || "replace";

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

      client.then(function (client) {
        const port = msg.port || node.port || null
        const confirmed = ("confirmed" in msg) ? msg.confirmed : node.confirmed
        const schedule = msg.schedule || node.schedule || "replace"

        client.send(dev_id, msg.payload, port, confirmed, schedule);
      })
    });
  }

  RED.nodes.registerType("ttn downlink", TTNDownlink);
};
