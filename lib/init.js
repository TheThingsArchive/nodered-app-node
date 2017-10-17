module.exports = function(RED, node, config) {
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

  return node.config.client
    .then(function(client) {
      return new Promise(function (resolve, reject) {
        var res = false

        client.on('connect', function () {
          if (!res) {
            res = true
            resolve(client);
          }
        });

        client.on('error', function (err) {
          if (!res) {
            res = true
            reject(err);
          }
        });
      })
    })
    .then(function (client) {
      node.status({
        fill: 'green',
        shape: 'dot',
        text: 'connected',
      });

      return client
    })
    .catch(function(err) {
      node.status({
        fill: 'red',
        shape: 'dot',
        text: 'error',
      });
      throw err;
    });
};
