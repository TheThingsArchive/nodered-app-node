"use strict"

var init = require("../lib/init")

module.exports = function (RED) {
  RED.nodes.registerType("ttn uplink", function (config) {
    var node = this

    RED.nodes.createNode(node, config)

    node.dev_id = config.dev_id || "+"
    node.field = config.field

    var client = init(RED, node, config)

    if (!client) {
      return
    }

    client.then(function (client) {
      client.on("uplink", node.dev_id, node.field, function (dev_id, data) {
        var msg = node.field ? {} : data
        msg.dev_id = dev_id
        msg.payload = node.field ? data : (data.payload_fields || data.payload_raw)
        node.send([ msg ])
      })
    })
  })
}
