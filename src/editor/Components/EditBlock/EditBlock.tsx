import React, {Fragment, useEffect, useRef} from 'react';

import {ChevronDown, ChevronUp, Copy, TrashBin} from '@gravity-ui/icons';

import {EditBlockProps} from '../../../editor/types';
import {block} from '../../../utils';

import './EditBlock.scss';

const b = block('edit-block');

const EditBlock = ({
    id,
    isHeader,
    activeBlockId,
    onDelete,
    onSelect,
    onCopy,
    onOrderChange,
    children,
    orderedBlocksCount,
}: EditBlockProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const controlsActive = activeBlockId === id;

    useEffect(() => {
        if (controlsActive && ref.current) {
            ref.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [controlsActive]);

    return (
        <div
            className={b()}
            onClick={() => {
                onSelect(id);
            }}
            ref={ref}
        >
            <div className={b('controls', {active: controlsActive, isHeader})}>
                {controlsActive && (
                    <div className={b('controls-content')} onClick={(e) => e.stopPropagation()}>
                        {typeof id === 'number' && (
                            <Fragment>
                                {id > 0 && (
                                    <div
                                        className={b('control')}
                                        onClick={() => onOrderChange(id, id - 1)}
                                    >
                                        <ChevronUp />
                                    </div>
                                )}
                                {id < orderedBlocksCount - 1 && (
                                    <div
                                        className={b('control')}
                                        onClick={() => onOrderChange(id, id + 1)}
                                    >
                                        <ChevronDown />
                                    </div>
                                )}
                                <div className={b('control')} onClick={() => onCopy(id)}>
                                    <Copy />
                                </div>
                            </Fragment>
                        )}
                        <div className={b('control')} onClick={() => onDelete(id)}>
                            <TrashBin />
                        </div>
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};

export default React.memo(EditBlock);
