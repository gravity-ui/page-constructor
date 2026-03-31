import * as React from 'react';
import {Button, DropdownMenu} from '@gravity-ui/uikit';
import {ConfigInput} from '../../../form-generator';
import {formBuilderCn} from '../../utils/cn';

import './AddPropertyButton.scss';

const b = formBuilderCn('add-property-button');

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
