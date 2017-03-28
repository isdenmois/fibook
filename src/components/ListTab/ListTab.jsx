import React, { PureComponent, PropTypes } from 'react';
import { List, ListItem } from 'components/List';

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

        return (
            <ListItem
                center={title}
                subtitle={author}
                to={`/book/${MD5}`}
                key={MD5}
            />
        );
    }

    render() {
        const { data } = this.props;

        if (data.length === 0) {
            return <EmptyList />;
        }

        return (
            <List>
                {data.map(this.renderRow)}
            </List>
        );
    }
}

ListTab.propTypes = {
    data: PropTypes.array,
};
