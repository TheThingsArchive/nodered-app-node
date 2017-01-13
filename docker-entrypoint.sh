#!/bin/sh

# This Docker entrypoint configures a TTN application in Node-RED.
#
# Environment Variables:
# - TTN_APP_ID (required)
# - TTN_APP_ACCESS_KEY (required)
# - TTN_REGION (optional)
#
# Without the required ENV vars, the configuration is not changed.
# If the container is already configured, the configuration is not changed.

set -e

mkdir -p .node-red

if [[ ! -z "$TTN_APP_ID" ]] && [[ ! -z "$TTN_APP_ACCESS_KEY" ]] && [[ ! -f ".node-red/flows_$HOSTNAME.json" ]]
then
rand1=`< /dev/urandom tr -dc a-f0-9 | head -c8`
rand2=`< /dev/urandom tr -dc a-f0-9 | head -c6`
cat <<EOT > ".node-red/flows_$HOSTNAME.json"
[
  {"id":"$rand1.$rand2","type":"ttn app","z":"","appId":"$TTN_APP_ID","region":"$TTN_REGION","accessKey":"$TTN_APP_ACCESS_KEY"}
]
EOT
fi

exec "$@"
