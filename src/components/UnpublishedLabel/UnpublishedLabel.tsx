import React from 'react';

import {WithChildren} from '../../models';
import {block} from '../../utils';

import {i18n} from './i18n';

import './UnpublishedLabel.scss';

const b = block('unpublished-label');

export type LabeLType = 'label' | 'line';

export interface UnpublishedLabelProps {
    type?: LabeLType;
    className?: string;
}

const UnpublishedLabel = ({
    className,
    children,
    type = 'line',
}: WithChildren<UnpublishedLabelProps>) => (
    <div className={b({type}, className)}>{children || i18n('label_non_published')}</div>
);

export default UnpublishedLabel;
