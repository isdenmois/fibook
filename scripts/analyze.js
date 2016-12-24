#!/usr/bin/env node

const shelljs = require('shelljs');
const animateProgress = require('./progress');
const chalk = require('chalk');
const addCheckMark = require('./checkmark');

const progress = animateProgress('Generating stats');

// Generate stats.json file with webpack
shelljs.exec(
    'webpack --config webpack/webpack.config.prod.js --profile --json > stats.json',
    addCheckMark.bind(null, callback) // Output a checkmark on completion
);

// Called after webpack has finished generating the stats.json file
function callback() {
    clearInterval(progress);
    process.stdout.write(
        '\n\nOpen ' + chalk.magenta('http://webpack.github.io/analyse/') + ' in your browser and upload the stats.json file!'
    );
}
