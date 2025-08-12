import * as React from 'react';
import {Text} from '@gravity-ui/uikit';
import {formGeneratorCn} from '../../utils/cn';

import './OptionHeader.scss';

const b = formGeneratorCn('option-header');

interface OptionHeaderProps {
    title: string;
}

export const OptionHeader: React.FC<OptionHeaderProps> = ({title}) => (
    <div className={b()}>
        <Text variant="subheader-3">{title}</Text>
    </div>
);
