"use strict"
var initNode = require("../lib/init")

module.exports = function (RED) {
  RED.nodes.registerType("ttn downlink", function (config) {
    var node = this

    RED.nodes.createNode(node, config)

    node.dev_id = config.dev_id
    node.port = config.port ? parseInt(config.port, 10) : null
    node.confirmed = config.confirmed || false
    node.schedule = config.schedule || "replace"

    var client = initNode(RED, node, config)

    if (!client) {
      return
    }

    this.on("input", function (msg) {
      var dev_id = msg.dev_id || node.dev_id
      var port = msg.port || node.port || null
      var confirmed = ("confirmed" in msg) ? msg.confirmed : node.confirmed
      var schedule = msg.schedule || node.schedule || "replace"

      if (!dev_id) {
        node.error("No dev_id set")
        return
      }

      client.then(function (client) {
        client.send(dev_id, msg.payload, port, confirmed, schedule)
      })
    })
  })
}
