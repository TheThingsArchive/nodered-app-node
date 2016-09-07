# The Things Network Node-RED Node [![NPM](https://img.shields.io/npm/v/node-red-contrib-ttn.svg?maxAge=2592000)](http://flows.nodered.org/node/node-red-contrib-ttn)

The The Things Network Node for [Node-RED](http://nodered.org) emits messages and activation events from a specific application.

## Installation

```bash
cd $HOME/.node-red
npm install node-red-contrib-ttn
```

See the [Node-RED Documentation / Adding Nodes](http://nodered.org/docs/getting-started/adding-nodes) for more options.

## Documentation

Documentation can be found in [The Things Network Documentation](https://www.thethingsnetwork.org/docs/node-js/).

## Example

You can find the following flow for the [IFTTT Example](https://www.thethingsnetwork.org/docs/node-red/#example-ifttt) found in the [documentation](https://www.thethingsnetwork.org/docs/node-js/) in the  [Node-RED Library](http://flows.nodered.org/flow/2d475e136cda21c3d642b0da66e565fe):

[![Example](https://www.thethingsnetwork.org/docs/assets/node-red-ifttt-flow.png)](http://flows.nodered.org/flow/2d475e136cda21c3d642b0da66e565fe)

## Release Policies

### Pre-releases
If you'd like to do a pre-release this is how it works.

1.  Bump package [version](https://docs.npmjs.com/cli/version) and add git tag:

	- For the first pre-release of a version:

		```bash
		npm version pre[patch|minor|major]
		```
		
	- For consecutive pre-releases of the same version:

		```bash
		npm version prerelease
		```
	
2.	[Publish](https://docs.npmjs.com/cli/publish) to a pre-release stream (aka npm tag), e.g. `refactor`

	```bash
	npm publish --tag refactor
	```
	
3. [Push](https://git-scm.com/docs/git-push) commits, including tags:

	```bash
	npm run push
	```

### Releases

1. Bump package [version](https://docs.npmjs.com/cli/version) and add git tag:

	```bash
	npm version [patch|minor|major]
	```
	
	> **NOTE:** If the current version is a pre-release all of the above will simply remove the pre-release identifier. For example, if the current version is `2.0.0-3` then `npm version patch` will result in `2.0.0` and not `2.0.1`.

2. [Publish](https://docs.npmjs.com/cli/publish) package:

	```bash
	npm publish
	```
3. [Push](https://git-scm.com/docs/git-push) commits, including tags:

	```bash
	npm run push
	```