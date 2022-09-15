import React from 'react';

import {block} from '../../utils';
import {ReactFCC} from '../../models';
import i18n from './i18n';

import './UnpublishedLabel.scss';

const b = block('unpublished-label');

export type LabeLType = 'label' | 'line';

export interface UnpublishedLabelProps {
    type?: LabeLType;
    className?: string;
}

const UnpublishedLabel: ReactFCC<UnpublishedLabelProps> = ({
    className,
    children,
    type = 'line',
}) => <div className={b({type}, className)}>{children || i18n('label_non_published')}</div>;

export default UnpublishedLabel;
