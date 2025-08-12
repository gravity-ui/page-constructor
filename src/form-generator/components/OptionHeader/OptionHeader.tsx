import * as React from 'react';
import {Text} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import './OptionHeader.scss';

const b = block('option-header');

interface OptionHeaderProps {
    title: string;
}

export const OptionHeader: React.FC<OptionHeaderProps> = ({title}) => (
    <div className={b()}>
        <Text variant="subheader-3">{title}</Text>
    </div>
);
