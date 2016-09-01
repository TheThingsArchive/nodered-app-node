module.exports = function (RED) {
  function TTN (config) {
    RED.nodes.createNode(this, config);

    var node = this;
    node.appEUI = config.appEUI;
    node.accessKey = config.accessKey;
    node.broker = config.broker;

    var ttn = require('ttn')

    var client = new ttn.Client(node.broker, node.appEUI, node.accessKey)

    client.on('connect', function () {
      node.log('Connected to TTN application ' + node.appEUI)
      node.status({
        fill:  'green',
        shape: 'dot',
        text:  'connected',
      });
    });

    // get a message from a device
    client.on('uplink', function (msg) {
      var res = {
        payload: msg.fields,
        appEUI: node.appEUI,
        devEUI: msg.devEUI,
        metadata: msg.metadata,
        counter: msg.counter,
      };

      node.send([res, null]);
    });

    client.on('activation', function (msg) {
      var res = {
        payload: msg.devEUI,
      };
      node.send([null, res]);
    });

    client.on('error', function (err) {
      node.error('Error on connection for TTN application ' + node.appEUI + ': ' + err);
      node.status({
        fill:  'red',
        shape: 'dot',
        text:  'error',
      })
    });

    // clean up
    this.on('close', function (done) {
      node.log('closing connection');
      node.status({
        fill:  'grey',
        shape: 'dot',
        text:  'disconnected',
      });
      client.end();
      done();
    })

  }

  // return TTN();
   RED.nodes.registerType("ttn", TTN)
}
