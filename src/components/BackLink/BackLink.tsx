import React, {ReactNode, useCallback, useContext} from 'react';
import {Button, ButtonSize, Icon} from '@yandex-data-ui/common';
import arrowIcon from '@yandex-data-ui/common/assets/icons/arrow-sidebar.svg';
import {MobileContext} from '../../context/mobileContext';
export type Theme = 'default' | 'special';

export interface BackLinkProps {
    url: string;
    title: ReactNode;
    theme?: Theme;
    size?: ButtonSize;
    className?: string;
    shouldHandleBackAction?: boolean;
}

export default function BackLink(props: BackLinkProps) {
    const {useHistory} = useContext(MobileContext);
    const {push, goBack, navigationHistory} = useHistory();
    const {
        url,
        title,
        theme = 'default',
        size = 'l',
        className,
        shouldHandleBackAction = false,
    } = props;

    const backActionHandler = useCallback(async () => {
        if (navigationHistory?.length > 1) {
            goBack();
        } else {
            push({pathname: url});
        }
    }, [navigationHistory, goBack, push, url]);

    return (
        <Button
            className={className}
            view={theme === 'special' ? 'flat-contrast' : 'flat-secondary'}
            size={size}
            href={shouldHandleBackAction ? undefined : url}
            onClick={shouldHandleBackAction ? backActionHandler : undefined}
        >
            <Icon data={arrowIcon} size={24} />
            <span>{title}</span>
        </Button>
    );
}
