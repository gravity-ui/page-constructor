import * as React from 'react';
import {Icon, IconData, Text} from '@gravity-ui/uikit';
import {Check, CircleInfo, TriangleExclamation, Xmark} from '@gravity-ui/icons';

import {editorCn} from '../../utils/cn';

const b = editorCn('message-card');

import './MessageCard.scss';

export type MessageTheme = 'success' | 'error' | 'warning' | 'info';

const DEFAULT_ICONS: Record<MessageTheme, IconData> = {
    success: Check,
    error: Xmark,
    warning: TriangleExclamation,
    info: CircleInfo,
};

export interface MessageCardProps {
    title: string;
    description: string;
    theme: MessageTheme;
    icon?: IconData;
}

export const MessageCard: React.FC<MessageCardProps> = ({title, description, theme, icon}) => {
    const IconComponent = icon || DEFAULT_ICONS[theme];

    return (
        <div className={b({theme})}>
            <Icon className={b('icon')} data={IconComponent} size={20} />
            <div className={b('content')}>
                <Text variant="subheader-1" className={b('title')}>
                    {title}
                </Text>
                <Text variant="body-1" color="secondary" className={b('description')}>
                    {description}
                </Text>
            </div>
        </div>
    );
};
