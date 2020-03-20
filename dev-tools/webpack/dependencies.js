if (process.env.NODE_ENV === 'production') {
  process.exit(0)
}

require('shelljs/global')
const path = require('path')
const fs = require('fs')
const exists = fs.existsSync
const writeFile = fs.writeFileSync
const config = require('./config')
const pkg = require(path.join(process.cwd(), 'package.json'))
const dllConfig = config.dllPlugin
const outputPath = path.join(process.cwd(), dllConfig.path)
const dllManifestPath = path.join(outputPath, 'package.json')

/*
 * I use node_modules/react-boilerplate-dlls by default just because
 * it isn't going to be version controlled and babel wont try to parse it.
 */

mkdir('-p', outputPath)

echo('Building the Webpack DLL...')

/*
 * Create a manifest so npm install doesn't warn us
 */

if (!exists(dllManifestPath)) {
  writeFile(
    dllManifestPath,
    JSON.stringify(
      {
        name: 'react-fibook-dlls',
        private: true,
        author: pkg.author,
        repository: pkg.repository,
        version: pkg.version,
      },
      null,
      2,
    ),
    'utf8',
  )
}

exec('cross-env BUILDING_DLL=true webpack --display-chunks --color --config dev-tools/webpack/webpack.dll.js')
