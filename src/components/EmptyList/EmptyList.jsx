import React from 'react';
import { emptyList } from './EmptyList.scss';

export default function EmptyList() {
    return (
        <div className={emptyList}>
            Книг в разделе нет
        </div>
    );
}
