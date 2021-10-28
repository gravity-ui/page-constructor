import React from 'react';
import block from 'bem-cn-lite';

import './UnpublishedLabel.scss';

const b = block('UnpublishedLabel');

export type LabeLType = 'label' | 'line';

export interface UnpublishedLabelProps {
    type?: LabeLType;
    className?: string;
}

const UnpublishedLabel: React.FC<UnpublishedLabelProps> = ({
    className,
    children,
    type = 'line',
    //  {/* TODO: add i18n for label_non_published*/}
}) => <div className={b({type}, className)}>{children || 'label_non_published'}</div>;

export default UnpublishedLabel;
