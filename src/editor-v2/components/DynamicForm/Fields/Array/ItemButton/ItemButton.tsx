import React, {Fragment, useCallback, useRef, useState} from 'react';

import {ArrowDown, ArrowUp, EllipsisVertical, TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Menu, Popup} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../../../../models';
import {block} from '../../../../../../utils';

const b = block('array-item-button');

interface ItemButtonProps extends ClassNameProps {
    onRemove: () => void;
    onReorderUp: () => void;
    disableReorderUp?: boolean;
    onReorderDown: () => void;
    disableReorderDown?: boolean;
}

const ItemButton: React.FC<ItemButtonProps> = (props) => {
    const {
        className,
        onRemove,
        onReorderUp,
        onReorderDown,
        disableReorderUp = false,
        disableReorderDown = false,
    } = props;
    const buttonRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const onMenuItemClickWrapper = useCallback((callback: () => void) => {
        return () => {
            setIsOpen(false);
            callback();
        };
    }, []);

    return (
        <Fragment>
            <Button className={b(null, className)} ref={buttonRef} onClick={() => setIsOpen(true)}>
                <Icon data={EllipsisVertical} />
            </Button>
            <Popup
                placement={'bottom-end'}
                anchorRef={buttonRef}
                open={isOpen}
                onOutsideClick={() => setIsOpen(false)}
            >
                <Menu>
                    <Menu.Item
                        theme={'danger'}
                        onClick={onMenuItemClickWrapper(onRemove)}
                        iconStart={<Icon data={TrashBin} />}
                    >
                        Remove
                    </Menu.Item>
                    <Menu.Item
                        disabled={disableReorderUp}
                        onClick={onMenuItemClickWrapper(onReorderUp)}
                        iconStart={<Icon data={ArrowUp} />}
                    >
                        Reorder Up
                    </Menu.Item>
                    <Menu.Item
                        disabled={disableReorderDown}
                        onClick={onMenuItemClickWrapper(onReorderDown)}
                        iconStart={<Icon data={ArrowDown} />}
                    >
                        Reorder Down
                    </Menu.Item>
                </Menu>
            </Popup>
        </Fragment>
    );
};

export default ItemButton;
