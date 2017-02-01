import React, { PureComponent, PropTypes } from 'react';
import {
    ListItem,
} from 'react-onsenui';

import EmptyList from '../EmptyList';
import navigate from '../../utils/navigate';

export default class ListTab extends PureComponent {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(book) {
        const MD5 = book.get('MD5');
        const title = book.get('title');
        const author = book.get('author');
        const onClick = () => {
            navigate(`book/${MD5}`);
        };

        return (
            <ListItem
                key={MD5}
                tappable
                onClick={onClick}
            >
                <div className="center">
                    <div className="list__item__title">
                        {title}
                    </div>
                    <div className="list__item__subtitle">
                        {author}
                    </div>
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
    data: PropTypes.array,
};
