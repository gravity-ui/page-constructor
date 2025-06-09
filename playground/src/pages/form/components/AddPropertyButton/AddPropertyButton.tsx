import * as React from 'react';
import {Button, DropdownMenu} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {ConfigInput} from '../../../../../../src/editor-v2';

import './AddPropertyButton.scss';

const b = block('add-property-button');

interface AddPropertyButtonProps {
    inputTypeMenuItems: Array<{action: () => void; text: string; type: string}>;
    onAdd: (type: ConfigInput['type']) => void;
    buttonText?: string;
}

export const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    inputTypeMenuItems,
    onAdd,
    buttonText = '+ Add Property',
}) => (
    <div className={b()}>
        <DropdownMenu
            items={inputTypeMenuItems.map((item) => ({
                ...item,
                action: () => {
                    onAdd(item.type as ConfigInput['type']);
                },
            }))}
            renderSwitcher={(props) => (
                <Button {...props} view="normal" size="s">
                    {buttonText}
                </Button>
            )}
        />
    </div>
);
