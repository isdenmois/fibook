# No need to build the DLL in production
if process.env.NODE_ENV == 'production'
    process.exit(0)

require('shelljs/global')

path = require('path')
fs = require('fs')
exists = fs.existsSync
writeFile = fs.writeFileSync

config = require('./config')
pkg = require(path.join(process.cwd(), 'package.json'))
dllConfig = config.dllPlugin

outputPath = path.join(process.cwd(), dllConfig.path)
dllManifestPath = path.join(outputPath, 'package.json')

###
 * I use node_modules/react-boilerplate-dlls by default just because
 * it isn't going to be version controlled and babel wont try to parse it.
###
mkdir('-p', outputPath)

echo('Building the Webpack DLL...')

###
 * Create a manifest so npm install doesn't warn us
###
if !exists(dllManifestPath)
    writeFile(
        dllManifestPath,
        JSON.stringify(
            (
                name: 'react-fibook-dlls'
                private: true
                author: pkg.author
                repository: pkg.repository
                version: pkg.version
            )
            null
            2
        )
        'utf8'
    )

# the BUILDING_DLL env var is set to avoid confusing the development environment
exec('cross-env BUILDING_DLL=true webpack --display-chunks --color --config dev-tools/webpack/webpack.dll.coffee')
