const path = require('path')
const Koop = require('koop')
const fs = require('fs-extra')
const getProvider = require('./get-provider')
const argv = require('yargs-parser')(process.argv.slice(2))

const { cwd, port, dataPath } = argv
const koop = new Koop()
const koopConfig = fs.readJsonSync(path.join(cwd, 'koop.json'))
const packageInfo = fs.readJsonSync(path.join(cwd, 'package.json'))
const plugin = require(path.join(cwd, packageInfo.main))

// register the current plugingetProvider
koop.register(plugin)

// note that a default output is provided by the koop-core
// (https://github.com/koopjs/koop-output-geoservices), a provider is still
// needed and here we provide a simple GeoJSON provider
if (koopConfig.type !== 'provider') {
  koop.register(getProvider(path.join(cwd, dataPath)))
}

koop.server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
