import * as React from 'react';

import {Card, Text} from '@gravity-ui/uikit';

import FormGenerator from '../../../form-generator-v2/FormGenerator';
import {useCanvasContent} from '../../CanvasContentContext';
import {useFormContext} from '../../hooks/FormContext';
import {formBuilderV2Cn} from '../../utils/cn';
import {stripIds} from '../../utils/stripIds';

import './ContentTab.scss';

const b = formBuilderV2Cn('content-tab');

export const ContentTab = () => {
    const {formFields} = useFormContext();
    const {content, setContent} = useCanvasContent();

    const schema = React.useMemo(() => stripIds(formFields), [formFields]);

    return (
        <div className={b()}>
            <Card className={b('column')} view="outlined">
                <Text variant="subheader-2" className={b('title')}>
                    Live form
                </Text>
                {schema.length > 0 ? (
                    <FormGenerator
                        blockConfig={schema}
                        contentConfig={content}
                        onUpdate={setContent}
                    />
                ) : (
                    <Text variant="body-2" color="hint">
                        Add fields on the Visual tab to see the form here.
                    </Text>
                )}
            </Card>
            <Card className={b('column')} view="outlined">
                <Text variant="subheader-2" className={b('title')}>
                    Content JSON
                </Text>
                <pre className={b('json')}>{JSON.stringify(content, null, 2)}</pre>
            </Card>
        </div>
    );
};
