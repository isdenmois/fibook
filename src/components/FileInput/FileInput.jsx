import React, { Component, PropTypes } from 'react';

import css from './FileInput.css';

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
            <div className={css.wrapper}>
                <input
                    className={css.input}
                    ref="fileInput"
                    type="file"
                    name={name}
                    onChange={this.onChange}
                    accept={accept}
                />
                <span className={css.icon}>
                    {children}
                </span>
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
