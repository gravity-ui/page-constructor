import React, {PropsWithChildren, useMemo, useRef, useState} from 'react';

import {Plus} from '@gravity-ui/icons';
import {Popup, TextInput} from '@gravity-ui/uikit';

import {blockMap} from '../../../constructor-items';
import {Block, BlockType, ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import EditorBlocksData from '../../data';

import './AddBlock.scss';

const b = block('add-block');

export interface AddBlockProps extends ClassNameProps {
    onAdd: (data: Block) => void;
}

const sortedBlockNames = Object.keys(blockMap).sort();

const AddBlock = ({onAdd, className}: PropsWithChildren<AddBlockProps>) => {
    const [isOpened, setIsOpened] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef(null);
    const blocks = useMemo(
        () =>
            sortedBlockNames.filter((blockName) =>
                EditorBlocksData[blockName as BlockType].meta.title
                    .toLocaleLowerCase()
                    .startsWith(search.toLocaleLowerCase()),
            ),
        [search],
    );

    return (
        <div className={b(null, className)} ref={ref}>
            <button
                className={b('button')}
                type="button"
                onClick={() => {
                    setIsOpened(!isOpened);
                    setSearch('');
                }}
            >
                <Plus className={b('icon')} />
            </button>
            {isOpened && (
                <Popup
                    anchorRef={ref}
                    open={isOpened}
                    contentClassName={b('popup')}
                    placement="top"
                    offset={[0, 24]}
                    onOutsideClick={() => setIsOpened(false)}
                >
                    <div className={b('search')}>
                        <TextInput
                            placeholder="search"
                            type="text"
                            value={search}
                            size="l"
                            onUpdate={(value) => setSearch(value)}
                        />
                    </div>
                    <div className={b('blocks')}>
                        {blocks.map((blockName) => {
                            const blockData = EditorBlocksData[blockName as BlockType];
                            const Preview = blockData?.preview as React.FC<
                                React.SVGProps<SVGSVGElement>
                            >;

                            return (
                                <div
                                    key={blockName}
                                    className={b('block')}
                                    onClick={() => {
                                        onAdd(blockData?.template as Block);
                                        setIsOpened(false);
                                    }}
                                >
                                    <div className={b('preview')}>
                                        <Preview />
                                    </div>
                                    <div className={b('info')}>
                                        <h4 className={b('title')}>{blockData.meta.title}</h4>
                                        {blockData?.meta?.description && (
                                            <p className={b('description')}>
                                                {blockData.meta.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Popup>
            )}
        </div>
    );
};

export default AddBlock;
