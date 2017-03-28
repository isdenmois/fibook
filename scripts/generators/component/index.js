/**
 * Component generator
 */
const componentExists = require('../utils/componentExists');
module.exports = {
    description: 'Add an unconnected component',
    prompts: [{
        type: 'list',
        name: 'type',
        message: 'Select the type of component',
        default: 'Stateless Function',
        choices: () => ['ES6 Class (Pure)', 'ES6 Class'],
    }, {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'Button',
        validate: (value) => {
            if ((/.+/).test(value)) {
                return componentExists(value) ? 'A component or container with this name already exists' : true;
            }

            return 'The name is required';
        },
    }, {
        type: 'confirm',
        name: 'wantCSS',
        default: true,
        message: 'Do you want css?',
    }],
    actions: (data) => {
        let componentTemplate;

        switch (data.type) {
            case 'ES6 Class': {
                componentTemplate = './component/es6.js.hbs';
                break;
            }
            case 'ES6 Class (Pure)': {
                componentTemplate = './component/pure.js.hbs';
                break;
            }
            default: {
                componentTemplate = './component/pure.js.hbs';
            }
        }

        const actions = [
            {
                type: 'add',
                path: '../../src/components/{{properCase name}}/{{properCase name}}.jsx',
                templateFile: componentTemplate,
                abortOnFail: true,
            },
            {
                type: 'add',
                path: '../../src/components/{{properCase name}}/index.js',
                templateFile: './component/index.js.hbs',
                abortOnFail: true,
            },
            {
                type: 'add',
                path: '../../src/components/{{properCase name}}/{{properCase name}}.test.js',
                templateFile: './component/test.js.hbs',
                abortOnFail: true,
            },
        ];

        if (data.wantCSS) {
            actions.push({
                type: 'add',
                path: '../../src/components/{{properCase name}}/{{properCase name}}.css',
                templateFile: './component/styles.css.hbs',
                abortOnFail: true,
            });
        }

        return actions;
    },
};
