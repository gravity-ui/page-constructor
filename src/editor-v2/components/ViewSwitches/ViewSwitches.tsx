import React from 'react';

import {Display, Eye, Smartphone, Square, SquareDashedText} from '@gravity-ui/icons';
import {Icon, RadioButton, RadioButtonOption} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';

import './ViewSwitches.scss';

const b = block('view-switches');

interface ViewSwitchesProps extends ClassNameProps {}

const options1: RadioButtonOption[] = [
    {value: 'edit-mode', content: <Icon data={SquareDashedText} />},
    {value: 'preview-mode', content: <Icon data={Eye} />},
];

export const options2: RadioButtonOption[] = [
    {value: 'desktop-mode', content: <Icon data={Display} />},
    {value: 'tablet-mode', content: <Icon data={Square} />},
    {value: 'phone-mode', content: <Icon data={Smartphone} />},
];

// TODO: To be done
const ViewSwitches: React.FC<ViewSwitchesProps> = ({className}) => {
    return (
        <div className={b(null, className)}>
            <RadioButton
                className={b('switch')}
                name="group1"
                defaultValue={options1[0].value}
                options={options1}
                size="m"
                disabled
            />
            <RadioButton
                className={b('switch')}
                name="group2"
                defaultValue={options2[0].value}
                options={options2}
                size="m"
                disabled
            />
        </div>
    );
};

export default ViewSwitches;
