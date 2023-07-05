import React from 'react';

import {Display, Pencil, Smartphone} from '@gravity-ui/icons';
import {RadioButton} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {ViewModeItem} from '../../types';

import i18n from './i18n';

const ICON_SIZE = 14;

import './ControlPanel.scss';

const b = block('control-panel');

const ControlPanelViewModeIcons = {
    [ViewModeItem.Edititng]: Pencil,
    [ViewModeItem.Desktop]: Display,
    [ViewModeItem.Tablet]: Smartphone,
    [ViewModeItem.Mobile]: Smartphone,
};

export interface ControlPanelProps extends ClassNameProps {
    viewMode?: ViewModeItem;
    onViewModeChange: (viewMode: ViewModeItem) => void;
}

const ControlPanel = ({
    viewMode = ViewModeItem.Edititng,
    onViewModeChange,
    className,
}: ControlPanelProps) => (
    <div className={b(null, className)}>
        <div className={b('mode-switch')}>
            <span>{i18n('mode')}</span>
            <RadioButton
                className={b('radio-button')}
                value={viewMode}
                onUpdate={(value) => onViewModeChange(value as ViewModeItem)}
            >
                {Object.values(ViewModeItem).map((item) => {
                    const Icon = ControlPanelViewModeIcons[item];

                    return (
                        <RadioButton.Option key={item} value={item}>
                            <span className={b('icon')}>
                                <Icon width={ICON_SIZE} height={ICON_SIZE} />
                            </span>
                        </RadioButton.Option>
                    );
                })}
            </RadioButton>
        </div>
    </div>
);

export default ControlPanel;
