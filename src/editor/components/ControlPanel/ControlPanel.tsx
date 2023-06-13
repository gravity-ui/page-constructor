import React from 'react';

import {Display, Pencil} from '@gravity-ui/icons';
import {RadioButton} from '@gravity-ui/uikit';

import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';

import i18n from './i18n';

const ICON_SIZE = 14;

import './ControlPanel.scss';

const b = block('control-panel');

export enum ViewModeItem {
    Edititng = 'editing',
    View = 'view',
}

const ControlPanelViewModeIcons = {
    [ViewModeItem.Edititng]: Pencil,
    [ViewModeItem.View]: Display,
};

export interface ControlPanelProps extends ClassNameProps {
    viewMode?: ViewModeItem;
    onViewModeChange: (viewMode: ViewModeItem) => void;
}

const ControlPanel = ({
    viewMode = ViewModeItem.Edititng,
    onViewModeChange,
    className,
}: ControlPanelProps) => {
    return (
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
                                <Icon className={b('icon')} width={ICON_SIZE} height={ICON_SIZE} />
                            </RadioButton.Option>
                        );
                    })}
                </RadioButton>
            </div>
        </div>
    );
};

export default ControlPanel;
