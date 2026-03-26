import * as React from 'react';
import {Text} from '@gravity-ui/uikit';
import {formBuilderCn} from '../../utils/cn';

import './OptionHeader.scss';

const b = formBuilderCn('option-header');

interface OptionHeaderProps {
    title: string;
}

export const OptionHeader: React.FC<OptionHeaderProps> = ({title}) => (
    <div className={b()}>
        <Text variant="subheader-3">{title}</Text>
    </div>
);
