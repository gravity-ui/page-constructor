import * as React from 'react';
import {Button, Text} from '@gravity-ui/uikit';
import {formGeneratorCn} from '../../utils/cn';

import './FieldHeader.scss';

const b = formGeneratorCn('field-header');

interface FieldHeaderProps {
    title: string;
    onRemove: () => void;
    variant?: 'subheader-2' | 'subheader-3';
    buttonSize?: 's' | 'xs';
}

export const FieldHeader: React.FC<FieldHeaderProps> = ({
    title,
    onRemove,
    variant = 'subheader-2',
    buttonSize = 's',
}) => (
    <div className={b()}>
        <Text variant={variant}>{title}</Text>
        <Button view="flat-danger" size={buttonSize} onClick={onRemove}>
            Remove
        </Button>
    </div>
);
