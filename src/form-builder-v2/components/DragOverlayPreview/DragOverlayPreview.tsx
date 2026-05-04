import {Card, Icon, Label, Text} from '@gravity-ui/uikit';

import type {BuilderFieldType, FormField} from '../../types';
import {formBuilderV2Cn} from '../../utils/cn';
import {TYPE_ICONS, TYPE_LABELS} from '../../utils/fieldMeta';

import './DragOverlayPreview.scss';

const b = formBuilderV2Cn('drag-overlay');

interface DragOverlayPreviewProps {
    type: BuilderFieldType;
    field?: FormField;
}

const getFieldTitle = (f: FormField | undefined): string => {
    if (!f) return '';
    if ('title' in f) return f.title ?? '';
    if ('text' in f) return f.text ?? '';
    return '';
};

export const DragOverlayPreview = ({type, field}: DragOverlayPreviewProps) => {
    const name = field && 'name' in field ? field.name : '';
    const title = getFieldTitle(field);

    return (
        <Card className={b()} view="raised">
            <Icon data={TYPE_ICONS[type]} size={14} />
            <div className={b('text')}>
                <Text variant="body-2">{TYPE_LABELS[type]}</Text>
                {(name || title) && (
                    <Label theme="unknown" size="s">
                        {name || title}
                    </Label>
                )}
            </div>
        </Card>
    );
};
