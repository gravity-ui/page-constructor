import React, {ReactNode, useCallback, useContext} from 'react';
import {Button, ButtonSize, Icon} from '@gravity-ui/uikit';
import {ArrowSidebar} from '../../icons';
import {LocationContext} from '../../context/locationContext';
export type Theme = 'default' | 'special';

export interface BackLinkProps {
    url: string;
    title: ReactNode;
    theme?: Theme;
    size?: ButtonSize;
    className?: string;
    shouldHandleBackAction?: boolean;
    onClick?: () => void;
}

export default function BackLink(props: BackLinkProps) {
    const {history} = useContext(LocationContext);
    const {
        url,
        title,
        theme = 'default',
        size = 'l',
        className,
        shouldHandleBackAction = false,
        onClick,
    } = props;

    const backActionHandler = useCallback(async () => {
        if (!history) {
            return;
        }

        if (onClick) {
            onClick();
        }

        if (history.length > 1) {
            history.goBack();
        } else {
            history.push({pathname: url});
        }
    }, [history, onClick, url]);

    return (
        <Button
            className={className}
            view={theme === 'special' ? 'flat-contrast' : 'flat-secondary'}
            size={size}
            href={shouldHandleBackAction ? undefined : url}
            onClick={shouldHandleBackAction ? backActionHandler : undefined}
        >
            <Icon data={ArrowSidebar} size={24} />
            <span>{title}</span>
        </Button>
    );
}
