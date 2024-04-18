import React from 'react';

import {Code, Display, Smartphone, SquareDashedText} from '@gravity-ui/icons';
import {RadioButton, Select} from '@gravity-ui/uikit';

import {ClassNameProps, Theme, themeNames} from '../../../models';
import {block} from '../../../utils';
import {Tablet} from '../../icons/Tablet';
import {EditModeItem, ViewModeItem} from '../../types';

import {i18n} from './i18n';

import './ControlPanel.scss';

const ICON_SIZE = 14;

const b = block('control-panel');

const ControlPanelViewModeIcons = {
    [ViewModeItem.Desktop]: Display,
    [ViewModeItem.Tablet]: Tablet,
    [ViewModeItem.Mobile]: Smartphone,
};

const ControlPanelEditModeIcons = {
    [EditModeItem.Form]: SquareDashedText,
    [EditModeItem.Code]: Code,
};

export interface ControlPanelProps extends ClassNameProps {
    viewMode?: ViewModeItem;
    editMode?: EditModeItem;
    onViewModeChange: (viewMode: ViewModeItem) => void;
    onEditModeChange: (editMode: EditModeItem) => void;
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}

const ControlPanel = ({
    viewMode = ViewModeItem.Desktop,
    editMode = EditModeItem.Form,
    onViewModeChange,
    onEditModeChange,
    className,
    theme,
    onThemeChange,
}: ControlPanelProps) => (
    <div className={b(null, className)}>
        <div className={b('switch-container')}>
            <span>{i18n('edit_mode')}</span>
            <RadioButton
                className={b('radio-button')}
                value={editMode}
                onUpdate={(value) => onEditModeChange(value as EditModeItem)}
            >
                {Object.values(EditModeItem).map((item) => {
                    const Icon = ControlPanelEditModeIcons[item];

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
        <div className={b('switch-container')}>
            <span>{i18n('view_mode')}</span>
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
        <div className={b('switch-container')}>
            <span>{i18n('theme')}</span>
            <Select value={[theme]} onUpdate={(value) => onThemeChange(value[0] as Theme)}>
                {Object.values(Theme).map((item) => (
                    <Select.Option key={item} value={item}>
                        {themeNames[item]}
                    </Select.Option>
                ))}
            </Select>
        </div>
    </div>
);

export default ControlPanel;
