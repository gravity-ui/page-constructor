import * as React from 'react';

import {Label, Text} from '@gravity-ui/uikit';
import {cloneDeep, set, unset} from 'lodash';

import {componentMap} from '../../../../form-generator-v2/components/constants';
import type {Content, OnUpdate} from '../../../../form-generator-v2/types';
import {useCanvasContent} from '../../../CanvasContentContext';
import {FormField} from '../../../types';
import {formBuilderV2Cn} from '../../../utils/cn';

const b = formBuilderV2Cn('canvas-card');

const isTemplateField = (field: FormField): boolean =>
    'name' in field && typeof field.name === 'string' && field.name.includes('{{index}}');

const makeOnUpdate =
    (setContent: React.Dispatch<React.SetStateAction<Content>>): OnUpdate =>
    (key, value, options) => {
        setContent((prev) => {
            const next = cloneDeep(prev);
            if (options?.unset) {
                unset(next, key);
            } else {
                set(next, key, value);
            }
            return next;
        });
    };

interface FieldPreviewProps {
    field: FormField;
}

export const FieldPreview = ({field}: FieldPreviewProps) => {
    const {content, setContent, templateContent, setTemplateContent} = useCanvasContent();

    const onUpdateForContent = React.useMemo<OnUpdate>(
        () => makeOnUpdate(setContent),
        [setContent],
    );
    const onUpdateForTemplate = React.useMemo<OnUpdate>(
        () => makeOnUpdate(setTemplateContent),
        [setTemplateContent],
    );

    if (field.type === 'section') {
        return (
            <div className={b('section-header')}>
                <Text variant="subheader-2">{field.title || 'Section'}</Text>
                {field.index ? (
                    <Label theme="info" size="s">
                        Array · {field.itemTitle ?? 'Item {{index}}'}
                    </Label>
                ) : (
                    <Label theme="unknown" size="s">
                        Group
                    </Label>
                )}
            </div>
        );
    }

    const Component = componentMap[field.type] as
        | React.ComponentType<Record<string, unknown>>
        | undefined;
    if (!Component) {
        return null;
    }

    const {when: _when, id: _id, ...fieldProps} = field;

    const useTemplate = isTemplateField(field);
    const widgetContent = useTemplate ? templateContent : content;
    const onUpdate = useTemplate ? onUpdateForTemplate : onUpdateForContent;

    return (
        <Component
            {...(fieldProps as Record<string, unknown>)}
            content={widgetContent}
            onUpdate={onUpdate}
        />
    );
};
