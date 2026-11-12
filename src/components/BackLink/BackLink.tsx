import * as React from 'react';

import {ArrowLeft} from '@gravity-ui/icons';
import {Button, ButtonSize, Icon, ButtonProps as UIKitButtonProps} from '@gravity-ui/uikit';

import {LocationContext} from '../../context/locationContext';
import {useAnalytics} from '../../hooks';
import {DefaultEventNames, Tabbable} from '../../models';
import {block} from '../../utils';

import './BackLink.scss';

const b = block('back-link');

export type Theme = 'default' | 'special';

export interface BackLinkProps<T = HTMLElement> extends Tabbable {
    url: string;
    title: React.ReactNode;
    theme?: Theme;
    size?: ButtonSize;
    className?: string;
    shouldHandleBackAction?: boolean;
    onClick?: () => void;
    extraProps?: React.HTMLProps<T>;
}

export default function BackLink(props: BackLinkProps) {
    const {history} = React.useContext(LocationContext);
    const {
        url,
        title,
        theme = 'default',
        size = 'l',
        className,
        shouldHandleBackAction = false,
        onClick,
        tabIndex,
        extraProps,
    } = props;
    const handleAnalytics = useAnalytics(DefaultEventNames.ShareButton, url);

    const backActionHandler = React.useCallback(async () => {
        handleAnalytics();

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
    }, [handleAnalytics, history, onClick, url]);

    const buttonProps = {
        href: shouldHandleBackAction ? undefined : url,
        onClick: shouldHandleBackAction ? backActionHandler : undefined,
        ...extraProps,
        tabIndex: tabIndex ?? extraProps?.tabIndex,
    } as UIKitButtonProps;

    return (
        <Button
            {...buttonProps}
            className={b({theme}, className)}
            view={theme === 'special' ? 'flat' : 'flat-secondary'}
            size={size}
        >
            <Icon data={ArrowLeft} size={20} />
            <span>{title}</span>
        </Button>
    );
}
