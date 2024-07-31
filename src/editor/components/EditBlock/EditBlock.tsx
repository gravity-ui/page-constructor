/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// TODO fix in https://github.com/gravity-ui/page-constructor/issues/965

import React, {useEffect, useRef} from 'react';

import {ChevronDown, ChevronUp, Copy as CopyIcon, TrashBin} from '@gravity-ui/icons';

import {block} from '../../../utils';
import {EditBlockProps} from '../../types';

import './EditBlock.scss';

const b = block('edit-block');

export enum EditBlockControls {
    Up = 'up',
    Down = 'down',
    Copy = 'copy',
    Delete = 'delete',
}

const actionsOrder = [
    EditBlockControls.Up,
    EditBlockControls.Down,
    EditBlockControls.Copy,
    EditBlockControls.Delete,
];

const editBlockControlsIcons = {
    [EditBlockControls.Up]: ChevronUp,
    [EditBlockControls.Down]: ChevronDown,
    [EditBlockControls.Copy]: CopyIcon,
    [EditBlockControls.Delete]: TrashBin,
};

export type EditBlockActions = {
    [key in EditBlockControls]?: () => void;
};

const EditBlock = ({
    actions,
    isActive,
    onSelect,
    isHeader,
    children,
    resetPaddings,
}: EditBlockProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isActive && ref.current) {
            //TODO: add behavior 'smooth' after addiiton of dynamic form layout open/close managing support
            ref.current.scrollIntoView({block: 'center'});
        }
    }, [isActive]);

    return (
        <div className={b({active: isActive})} onClick={onSelect} ref={ref}>
            <div
                className={b('controls', {
                    active: isActive,
                    isHeader,
                    'reset-paddings': resetPaddings,
                })}
            >
                {isActive && (
                    <div className={b('controls-content')} onClick={(e) => e.stopPropagation()}>
                        {actionsOrder.map((action) => {
                            const Icon = editBlockControlsIcons[action];

                            return actions[action] ? (
                                <div
                                    key={action}
                                    className={b('control')}
                                    onClick={actions[action]}
                                >
                                    <Icon />
                                </div>
                            ) : null;
                        })}
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default React.memo(EditBlock);
