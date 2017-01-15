/* global FileReader */
import React, { Component, PropTypes } from 'react';
import { Fab } from 'react-onsenui';

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

            this.props.onFileSelect(file);
        }
    }

    render() {
        const { name, accept, children } = this.props;

        return (
            <Fab
                position="bottom right"
                className={fileInput}
            >
                <input
                    ref="fileInput"
                    type="file"
                    name={name}
                    onChange={this.onChange}
                    accept={accept}
                />
                {children}
            </Fab>
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
