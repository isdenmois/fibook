/* global FileReader */
import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { fileInput } from './FileInput.scss';

/**
 *
 */
export default class FileInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const target = event.target;

        if (target.files.length) {
            const file = target.files[0];
            target.value = '';

            this.readFile(file);
        }
    }

    readFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            this.props.onFileSelect(file, event.target.result);
        };

        reader.readAsText(file);
    }

    render() {
        const { name, accept, children } = this.props;

        return (
            <div className={fileInput}>
                <input
                    type="file"
                    name={name}
                    onChange={this.onChange}
                    accept={accept}
                    className="file"
                />
                <FloatingActionButton secondary>
                    {children}
                </FloatingActionButton>
            </div>
        );
    }
}

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    onFileSelect: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    accept: PropTypes.string,
};

FileInput.defaultProps = {
    accept: '.fb2',
    name: 'file-input',
};
