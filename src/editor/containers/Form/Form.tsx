import * as React from 'react';

import {Text} from '@gravity-ui/uikit';
import {JSONSchema4} from 'json-schema';

import {Block, PageContent} from '../../../models';
import {block, getBlockKey} from '../../../utils';
import {BlockForm} from '../../components/BlockForm/BlockForm';
import useFormSpec from '../../hooks/useFormSpec';

import './Form.scss';

const b = block('editor-form');

export interface FormProps {
    content: PageContent;
    schema: JSONSchema4;
    activeBlockIndex: number;
    onChange: (content: PageContent) => void;
    onSelect: (index: number) => void;
}

// TODO in https://github.com/gravity-ui/page-constructor/issues/884 this component will be extremely refactor

export const Form = React.memo(
    ({content, onChange, activeBlockIndex, onSelect, schema}: FormProps) => {
        const {blocks} = content || {};
        const spec = useFormSpec(schema);
        const {blocks: blocksSpec} = spec || {};

        return (
            <div className={b()}>
                <Text variant="body-2">{'Blocks'}</Text>
                {blocks.map((blockData, index) =>
                    blocksSpec[blockData.type] ? (
                        <div className={b('block-form')} key={getBlockKey(blockData, index)}>
                            <BlockForm
                                spec={blocksSpec[blockData.type]}
                                data={blockData}
                                active={activeBlockIndex === index}
                                onChange={(data: Block) => {
                                    onChange({
                                        ...content,
                                        blocks: [
                                            ...blocks.slice(0, index),
                                            data,
                                            ...blocks.slice(index + 1),
                                        ],
                                    });
                                }}
                                onSelect={() => onSelect(index)}
                            />
                        </div>
                    ) : null,
                )}
            </div>
        );
    },
);

Form.displayName = 'Form';
