import {MouseEventHandler} from 'react';
import {ItemColumnName} from './constants';

type GetItemClickHandlerArgs = {
    column: ItemColumnName;
    index: number;
    activeItemId?: string;
    onActiveItemChange: (id?: string) => void;
};

export const getItemClickHandler: ({
    column,
    index,
    onActiveItemChange,
}: GetItemClickHandlerArgs) => MouseEventHandler =
    ({column, index, onActiveItemChange, activeItemId}) =>
    (e) => {
        const id = `${column}-${index}`;
        if (e) {
            e.stopPropagation();
        }
        onActiveItemChange(id === activeItemId ? undefined : `${column}-${index}`);
    };
