import {NavigationListItemProps} from '../../models';
import {getItemClickHandler} from '../../utils';
import NavigationItem from '../NavigationItem';

export const NavigationListItem = ({
    column,
    index,
    activeItemId,
    onActiveItemChange,
    ...props
}: NavigationListItemProps) => {
    const id = `${column}-${index}`;
    const isActive = id === activeItemId;
    const onClick = getItemClickHandler({
        column,
        index,
        activeItemId,
        onActiveItemChange,
    });

    return (
        <NavigationItem
            isActive={isActive}
            onClick={onClick}
            hidePopup={onActiveItemChange}
            {...props}
        />
    );
};

export default NavigationListItem;
