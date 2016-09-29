var initNode = require('../lib/init');

module.exports = function(RED) {

  function TTNSend(config) {
    var node = this;

    RED.nodes.createNode(node, config);
    
    var client = initNode(node, config);

    if (!client) {
      return;
    }

    this.on('input', function(msg) {
      client.downlink(msg.payload.devId, new Buffer(msg.payload.payload), msg.payload.port || 1);
    });
  }

  RED.nodes.registerType("ttn send", TTNSend);
};