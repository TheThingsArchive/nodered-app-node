module.exports = function(node, config) {
  node.app = config.app;
  node.config = RED.nodes.getNode(node.app);

  if (!node.config || !node.config.client) {
    node.error('No app set');
    node.status({
      fill: 'red',
      shape: 'dot',
      text: 'error',
    });
    return;
  }

  var client = node.config.client;

  client.on('connect', function() {
    node.status({
      fill: 'green',
      shape: 'dot',
      text: 'connected',
    });
  });

  client.on('error', function(err) {
    node.status({
      fill: 'red',
      shape: 'dot',
      text: 'error',
    });
  });
};