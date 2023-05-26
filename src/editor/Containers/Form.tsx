import React, {Fragment, memo, useMemo} from 'react';

import {DynamicField, dynamicConfig} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {Block, PageContent} from '../../models';
import {EditorBlockId} from '../types';
import {blockSpecs} from '../utils/form';

export interface FormProps {
    content: PageContent;
    onChange: (content: PageContent) => void;
    acitveBlockId?: EditorBlockId;
}

interface BlockFormProps {
    data: Block;
    onChange: (data: Block) => void;
    active?: boolean;
}

export const BlockForm = memo(({data: {type, ...content}, onChange, active}: BlockFormProps) => {
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
                <Fragment>
                    <FormSpy
                        key={type}
                        onChange={({values}) => onChange({type, ...values.content})}
                        subscription={{values: true}}
                    />
                    <DynamicField name="content" spec={spec} config={dynamicConfig} />
                </Fragment>
            )}
        </FinalForm>
    );
});

BlockForm.displayName = 'BlockForm';

export const Form = memo(({content, onChange, acitveBlockId}: FormProps) => {
    const blocks = content?.blocks || [];

    return (
        <div>
            {blocks.map((block, index) => (
                <BlockForm
                    key={`${block.type}-${index}`}
                    data={block}
                    active={acitveBlockId === index + 1}
                    onChange={(data: Block) => {
                        onChange({
                            ...content,
                            blocks: [...blocks.slice(0, index), data, ...blocks.slice(index + 1)],
                        });
                    }}
                />
            ))}
        </div>
    );
});

Form.displayName = 'Form';
