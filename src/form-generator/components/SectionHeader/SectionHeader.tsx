import * as React from 'react';
import {Text} from '@gravity-ui/uikit';
import {formGeneratorCn} from '../../utils/cn';

import './SectionHeader.scss';

const b = formGeneratorCn('section-header');

interface SectionHeaderProps {
    title: string;
    variant?: 'body-1' | 'body-2';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({title, variant = 'body-1'}) => (
    <div className={b()}>
        <Text variant={variant}>{title}</Text>
    </div>
);
