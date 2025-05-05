import {ArrowDown, ArrowUp, EllipsisVertical, TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Menu, Popup} from '@gravity-ui/uikit';
import * as React from 'react';

import {editorCn} from '../../../../../utils/cn';

const b = editorCn('array-item-button');

interface ItemButtonProps {
    onRemove: () => void;
    onReorderUp: () => void;
    disableReorderUp?: boolean;
    onReorderDown: () => void;
    disableReorderDown?: boolean;
    className?: string;
}

const ItemButton = ({
    className,
    onRemove,
    onReorderUp,
    onReorderDown,
    disableReorderUp = false,
    disableReorderDown = false,
}: ItemButtonProps) => {
    const buttonRef = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const onMenuItemClickWrapper = React.useCallback((callback: () => void) => {
        return () => {
            setIsOpen(false);
            callback();
        };
    }, []);

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

export default ItemButton;
