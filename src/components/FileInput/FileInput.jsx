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

    readFile(file, encode = 'utf-8') {
        const reader = new FileReader();

        reader.onload = (event) => {
            const result = event.target.result;

            // Find file encoding.
            const match = result.slice(0, 200).match(/encoding="(.*?)"/);
            let encoding;
            if (match && match[1]) {
                encoding = match[1].toLowerCase();
            } else {
                encoding = 'utf-8';
            }

            if (encoding !== encode) {
                this.readFile(file, encoding);
            } else {
                this.props.onFileSelect(file, result);
            }
        };

        reader.readAsText(file, encode);
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
