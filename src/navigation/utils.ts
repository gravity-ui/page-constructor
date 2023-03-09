import {MouseEventHandler} from 'react';
import {ItemColumnName} from './constants';

type GetItemClickHandlerArgs = {
    column: ItemColumnName;
    index: number;
    activeItemId: string;
    onActiveItemChange: (index: string) => void;
};

export const getItemClickHandler: ({
    column,
    index,
    onActiveItemChange,
}: GetItemClickHandlerArgs) => MouseEventHandler =
    ({column, index, onActiveItemChange, activeItemId}) =>
    (e) => {
        const id = `${column}-${index}`;
        e.stopPropagation();
        onActiveItemChange(id === activeItemId ? '' : `${column}-${index}`);
    };
