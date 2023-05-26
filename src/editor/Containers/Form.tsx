import React, {memo, useMemo} from 'react';

import {DynamicField, dynamicConfig} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {Block, PageContent} from '../../models';
import {getBlockKey} from '../../utils';
import {blockSpecs} from '../utils/form';

export interface FormProps {
    content: PageContent;
    activeBlockIndex: number;
    onChange: (content: PageContent) => void;
    onSelect: (index: number) => void;
}

interface BlockFormProps {
    data: Block;
    onChange: (data: Block) => void;
    onSelect: () => void;
    active?: boolean;
}

export const BlockForm = memo(
    ({data: {type, ...content}, onChange, onSelect, active}: BlockFormProps) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const initialValues = useMemo(() => ({content}), []);
        const spec = useMemo(
            () => ({
                ...blockSpecs[type],
                viewSpec: {
                    ...blockSpecs[type].viewSpec,
                    layoutOpen: active,
                },
            }),
            [type, active],
        );

        return (
            <FinalForm initialValues={initialValues} onSubmit={_.noop}>
                {() => (
                    <div
                        onClick={() => {
                            if (!active) {
                                onSelect();
                            }
                        }}
                    >
                        <FormSpy
                            key={type}
                            onChange={({values}) => onChange({type, ...values.content})}
                            subscription={{values: true}}
                        />
                        {/* add key to cause form rerender on active block change*/}
                        <DynamicField
                            name="content"
                            key={String(active)}
                            spec={spec}
                            config={dynamicConfig}
                        />
                    </div>
                )}
            </FinalForm>
        );
    },
);

BlockForm.displayName = 'BlockForm';

export const Form = memo(({content, onChange, activeBlockIndex, onSelect}: FormProps) => {
    const blocks = content?.blocks || [];

    return (
        <div>
            {blocks.map((block, index) => (
                <BlockForm
                    key={getBlockKey(block, index)}
                    data={block}
                    active={activeBlockIndex === index}
                    onChange={(data: Block) => {
                        onChange({
                            ...content,
                            blocks: [...blocks.slice(0, index), data, ...blocks.slice(index + 1)],
                        });
                    }}
                    onSelect={() => onSelect(index)}
                />
            ))}
        </div>
    );
});

Form.displayName = 'Form';
