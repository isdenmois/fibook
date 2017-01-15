import React, { PureComponent, PropTypes } from 'react';
import {
    Input,
    ListItem,
} from 'react-onsenui';

import EmptyList from '../EmptyList';

export default class ListTab extends PureComponent {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(book) {
        const MD5 = book.get('MD5');
        const title = book.get('title');
        const author = book.get('author');
        const status = book.get('status');
        const onChange = () => {
            this.props.onChange(book);
        };

        return (
            <ListItem
                key={MD5}
                tappable
            >
                <div className="center">
                    <div className="list__item__title">
                        {title}
                    </div>
                    <div className="list__item__subtitle">
                        {author}
                    </div>
                </div>
                <div className="right">
                    <Input
                        checked={!!status}
                        type="checkbox"
                        onClick={onChange}
                    />
                </div>
            </ListItem>
        );
    }

    render() {
        const { data } = this.props;

        if (data.length === 0) {
            return <EmptyList />;
        }

        return (
            <ons-list modifier="noborder">
                {data.map(this.renderRow)}
            </ons-list>
        );
    }
}

ListTab.propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.array,
};
