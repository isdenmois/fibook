

module.exports = function (w) {
    return {
        files: [
            'dev-tools/fileTransformer.js',
            'tsconfig.json',
            'src/**/*.ts',
            'src/**/*.tsx',
            '!src/**/*.d.ts',
            '!src/**/test/*.ts',
            '!src/**/test/*.tsx',
            '!src/**/tests/*.ts',
            '!src/**/tests/*.tsx',
        ],

        tests: [
            'src/**/test/*.ts',
            'src/**/test/*.tsx',
            'src/**/tests/*.ts',
            'src/**/tests/*.tsx',
        ],
        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jest',

        setup: function (wallaby) {
            var path = require('path')
            var jestConfig = require('./package.json').jest;
            jestConfig.globals = { "__DEV__": true };
            jestConfig.moduleNameMapper['\\.svg$'] = require.resolve('./dev-tools/fileTransformer')
            wallaby.testFramework.configure(jestConfig);
        }
    };
};
