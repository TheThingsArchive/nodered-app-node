var ttn = require('ttn');

module.exports = function(RED) {
  "use strict";

  function TTNConfig(config) {
    var node = this;

    RED.nodes.createNode(node, config);

    node.appId = config.appId;
    node.accessKey = config.accessKey;
    node.discovery = config.discovery;

    if (!node.appId || !node.accessKey || !node.discovery) {
      node.error('No appId, accessKey or discovery address set');
      return;
    }

    node.client =
      ttn.data(node.appId, node.accessKey, {
        address: node.discovery,
      })
      .then(function(client) {
        node.log('Connected to TTN application ' + node.appId);

        node.on('close', function(done) {
          node.log('Closing connection to TTN application ' + node.appId);
          client.close(true, done);
        });

        return client
      })
      .catch(function(err) {
        node.error('Error on connection for TTN application ' + node.appId + ': ' + err);
        throw err
      });
  }

  RED.nodes.registerType('ttn app', TTNConfig);
};
