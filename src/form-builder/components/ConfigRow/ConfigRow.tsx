import * as React from 'react';
import {Text, TextInput} from '@gravity-ui/uikit';
import {formBuilderCn} from '../../utils/cn';

import './ConfigRow.scss';

const b = formBuilderCn('config-row');

interface ConfigRowProps {
    label: string;
    value: string;
    onUpdate: (value: string) => void;
}

const ConfigRowComponent: React.FC<ConfigRowProps> = ({label, value, onUpdate}) => {
    const handleUpdate = React.useCallback(
        (newValue: string) => {
            onUpdate(newValue);
        },
        [onUpdate],
    );

    return (
        <div className={b()}>
            <Text variant="body-2">{label}:</Text>
            <TextInput value={value} onUpdate={handleUpdate} size="s" />
        </div>
    );
};

export const ConfigRow = React.memo(ConfigRowComponent);
