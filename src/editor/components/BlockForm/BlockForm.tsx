import React, {Fragment, memo, useMemo} from 'react';

import {DynamicField, SimpleVerticalAccordeon, Spec} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {Block} from '../../../models';
import {block} from '../../../utils';
import {dynamicConfig} from '../../dynamic-forms-custom/config';
import {CustomSpec} from '../../dynamic-forms-custom/parser/types';
import usePreviousValue from '../../hooks/usePreviousValue';

import './BlockForm.scss';

interface BlockFormProps {
    data: Block;
    spec: CustomSpec;
    onChange: (data: Block) => void;
    onSelect: () => void;
    active?: boolean;
}

const b = block('block-form');

export const BlockForm = memo(
    ({data: {type, ...content}, onChange, onSelect, active, spec: specRaw}: BlockFormProps) => {
        const initialValues = useMemo(() => ({content}), [content]);
        const prevContent = usePreviousValue(content);
        const spec = useMemo(
            () => ({
                ...specRaw,
                viewSpec: {
                    ...specRaw.viewSpec,
                    layoutOpen: active,
                },
            }),
            [specRaw, active],
        );

        if (!active) {
            return (
                <SimpleVerticalAccordeon
                    open={false}
                    name={type}
                    title={spec.viewSpec.layoutTitle || type}
                    onOpenChange={onSelect}
                    className={b('folded')}
                >
                    {/* SimpleVerticalAccordeon requires children, put dummy value*/}{' '}
                </SimpleVerticalAccordeon>
            );
        }

        return (
            <FinalForm initialValues={initialValues} onSubmit={_.noop}>
                {() => (
                    <Fragment>
                        <FormSpy
                            onChange={({values}) => {
                                // fix for FormSpy onChange called twice without content changes
                                if (!_.isEqual(values.content, prevContent)) {
                                    onChange({type, ...values.content});
                                }
                            }}
                            subscription={{values: true}}
                        />
                        <DynamicField
                            name="content"
                            spec={spec as Spec}
                            config={dynamicConfig}
                            withoutInsertFFDebounce
                        />
                    </Fragment>
                )}
            </FinalForm>
        );
    },
);

BlockForm.displayName = 'BlockForm';
