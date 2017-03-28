import React, { PureComponent, PropTypes } from 'react';
import { List, ListItem } from 'components/List';
import { Link } from 'react-router-dom';

import EmptyList from '../EmptyList';
import css from './ListTab.css';

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
            <Link
                className={css.link}
                to={`/book/${MD5}`}
                key={MD5}
            >
                <ListItem
                    center={title}
                    subtitle={author}
                />
            </Link>
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
