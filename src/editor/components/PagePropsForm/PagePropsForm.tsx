import React, {memo, useMemo} from 'react';

import {DynamicField, Spec} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';
import {Form as FinalForm, FormSpy} from 'react-final-form';

import {PageContent} from '../../../models';
import {dynamicConfig} from '../../dynamic-forms-custom/config';
import {CustomSpec} from '../../dynamic-forms-custom/parser/types';

export type PagePropsFormData = Omit<PageContent, 'blocks'>;

export interface PagePropsFormProps {
    data: PagePropsFormData;
    spec: CustomSpec;
    onChange: (data: PagePropsFormData) => void;
}

export const PagePropsForm = memo(({data: content, spec, onChange}: PagePropsFormProps) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialValues = useMemo(() => ({content}), []);

    return (
        <FinalForm initialValues={initialValues} onSubmit={_.noop}>
            {() => (
                <div>
                    <FormSpy
                        onChange={({values}) => onChange({...values.content})}
                        subscription={{values: true}}
                    />
                    <DynamicField name="content" spec={spec as Spec} config={dynamicConfig} />
                </div>
            )}
        </FinalForm>
    );
});

PagePropsForm.displayName = 'PagePropsForm';
