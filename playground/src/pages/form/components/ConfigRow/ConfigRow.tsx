import * as React from 'react';
import {Text, TextInput} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import './ConfigRow.scss';

const b = block('config-row');

interface ConfigRowProps {
    label: string;
    value: string;
    onUpdate: (value: string) => void;
}

const ConfigRowComponent: React.FC<ConfigRowProps> = ({label, value, onUpdate}) => {
    // Memoize the onUpdate callback to prevent unnecessary rerenders
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

// Use React.memo to prevent unnecessary rerenders
export const ConfigRow = React.memo(ConfigRowComponent);
