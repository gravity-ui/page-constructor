import React, {Fragment} from 'react';

import {DynamicField, Spec, dynamicConfig} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {BannerCardProps as BannerSchema} from '../../blocks/Banner/schema';
import {Block, BlockType, PageContent} from '../../models';
import {getBlockSpec} from '../utils/form';

const Specs = {
    [BlockType.BannerBlock]: getBlockSpec(BlockType.BannerBlock, BannerSchema),
} as Record<BlockType, Spec>;

export interface FormProps {
    content: PageContent;
    onChange: (content: PageContent) => void;
}

interface BlockFormProps {
    data: Block;
    onChange: (data: Block) => void;
}

export const BlockForm = ({data: {type, ...content}, onChange}: BlockFormProps) => (
    <FinalForm initialValues={{content}} onSubmit={_.noop}>
        {() => (
            <Fragment>
                <FormSpy
                    onChange={({values}) => {
                        onChange({type, ...values.content});
                    }}
                />
                <DynamicField name="content" spec={Specs[type]} config={dynamicConfig} />
            </Fragment>
        )}
    </FinalForm>
);

export const Form = ({content, onChange}: FormProps) => {
    const blocks = content?.blocks || [];

    return (
        <div>
            {blocks.map((block, index) =>
                Specs[block.type] ? (
                    <BlockForm
                        data={block}
                        key={`${block.type}-${index}}`}
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
                    />
                ) : null,
            )}
        </div>
    );
};
