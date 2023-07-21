import React from 'react';

import {Display, Pencil, Smartphone} from '@gravity-ui/icons';
import {RadioButton, Select} from '@gravity-ui/uikit';

import {useTheme} from '../../../context/theme';
import {ClassNameProps, Theme, themeNames} from '../../../models';
import {block} from '../../../utils';
import {Tablet} from '../../icons/Tablet';
import {ViewModeItem} from '../../types';

import i18n from './i18n';

import './ControlPanel.scss';

const ICON_SIZE = 14;

const b = block('control-panel');

const ControlPanelViewModeIcons = {
    [ViewModeItem.Edititng]: Pencil,
    [ViewModeItem.Desktop]: Display,
    [ViewModeItem.Tablet]: Tablet,
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
}: ControlPanelProps) => {
    const [theme, onThemeSwitch] = useTheme();

    return (
        <div className={b(null, className)}>
            <div></div>
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
            <div className={b('theme-switch')}>
                <Select
                    className={b('radio-button')}
                    value={[theme]}
                    onUpdate={(value) => onThemeSwitch(value[0] as Theme)}
                >
                    {Object.values(Theme).map((theme) => (
                        <Select.Option key={theme} value={theme}>
                            {themeNames[theme]}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        </div>
    );
};

export default ControlPanel;
