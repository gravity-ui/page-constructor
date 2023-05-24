import React, {Fragment, useContext, useEffect, useRef} from 'react';

import {ChevronDown, ChevronUp, Copy, TrashBin} from '@gravity-ui/icons';

import {BlockIdContext} from '../../../context/blockIdContext';
import {EditBlockProps} from '../../../editor/types';
import {getBlockIndexFromId} from '../../../editor/utils';
import {block} from '../../../utils';

import './EditBlock.scss';

const b = block('edit-block');

const EditBlock = ({
    id,
    activeBlockId,
    onDelete,
    onSelect,
    onCopy,
    onOrderChange,
    children,
    orderedBlocksCount,
}: EditBlockProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const blockContenxtId = getBlockIndexFromId(useContext(BlockIdContext));
    const blockId = id || blockContenxtId;
    const controlsActive = activeBlockId === blockId;

    useEffect(() => {
        if (controlsActive && ref.current) {
            ref.current?.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
        }
    }, [controlsActive]);

    return (
        <div
            className={b()}
            onClick={() => {
                onSelect(blockId);
            }}
            ref={ref}
        >
            <div className={b('controls', {active: controlsActive})}>
                {controlsActive && (
                    <div className={b('controls-content')} onClick={(e) => e.stopPropagation()}>
                        {typeof blockId === 'number' && (
                            <Fragment>
                                {blockId > 0 && (
                                    <div
                                        className={b('control')}
                                        onClick={() => onOrderChange(blockId, blockId - 1)}
                                    >
                                        <ChevronUp />
                                    </div>
                                )}
                                {blockId < orderedBlocksCount - 1 && (
                                    <div
                                        className={b('control')}
                                        onClick={() => onOrderChange(blockId, blockId + 1)}
                                    >
                                        <ChevronDown />
                                    </div>
                                )}
                                <div className={b('control')} onClick={() => onCopy(blockId)}>
                                    <Copy />
                                </div>
                            </Fragment>
                        )}
                        <div className={b('control')} onClick={() => onDelete(blockId)}>
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
