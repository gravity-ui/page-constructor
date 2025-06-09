import * as React from 'react';
import {Text} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import './SectionHeader.scss';

const b = block('section-header');

interface SectionHeaderProps {
    title: string;
    variant?: 'body-1' | 'body-2';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({title, variant = 'body-1'}) => (
    <div className={b()}>
        <Text variant={variant}>{title}</Text>
    </div>
);
