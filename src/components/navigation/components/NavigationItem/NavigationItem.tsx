import React, {Fragment, MouseEventHandler, useContext, useMemo} from 'react';
import block from 'bem-cn-lite';

import {RouterLink, ToggleArrow, Button, Image} from '../../../index';
import {getLinkProps} from '../../../../utils';
import {LocationContext} from '../../../../context/locationContext';
import {
    NavigationButtonItem,
    NavigationDropdownItem,
    NavigationItemType,
    NavigationSocialItem,
    NavigationLinkItem,
    ImageProps,
    ButtonProps,
} from '../../../../models';
import {NavigationArrow} from '../../../../icons';
import SocialIcon from '../SocialIcon/SocialIcon';
import {getMediaImage} from '../../../Media/Image/utils';

import './NavigationItem.scss';

const b = block('navigation-item');

type DropdownItemData = Omit<NavigationDropdownItem, 'items'>;

export type NavigationItemData =
    | NavigationLinkItem
    | NavigationButtonItem
    | NavigationSocialItem
    | DropdownItemData;

export interface NavigationItemProps {
    data: NavigationItemData;
    className?: string;
    onClick?: MouseEventHandler;
    isOpened?: boolean;
}

const Content: React.FC<{text: string; icon?: ImageProps}> = ({text, icon}) => (
    <Fragment>
        {icon && <Image className={b('icon')} {...icon} />}
        <span className={b('text')}>{text}</span>
    </Fragment>
);

type NavigationDropdownProps = NavigationItemProps & DropdownItemData;

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
    text,
    icon,
    isOpened,
    ...props
}) => {
    const iconData = icon && getMediaImage(icon);

    return (
        <span {...props}>
            <Content text={text} icon={iconData} />
            <ToggleArrow
                className={b('dropdown')}
                size={12}
                type={'vertical'}
                iconType="navigation"
                open={isOpened}
            />
        </span>
    );
};

type NavigationLinkProps = NavigationItemProps & NavigationLinkItem;

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
    const {hostname} = useContext(LocationContext);
    const {url, text, icon, arrow, target, ...rest} = props;
    const linkExtraProps = getLinkProps(url, hostname, target);
    const iconData = icon && getMediaImage(icon);

    const content = (
        <Fragment>
            <Content text={text} icon={iconData} />
            {arrow && <NavigationArrow className={b('arrow')} />}
        </Fragment>
    );

    return linkExtraProps?.target ? (
        <a href={url} title={text} {...rest} {...linkExtraProps}>
            {content}
        </a>
    ) : (
        <RouterLink href={url} passHref>
            <a {...rest}>{content}</a>
        </RouterLink>
    );
};

const NavigationButton: React.FC<ButtonProps> = (props) => {
    const {url, target} = props;
    return target ? (
        <Button {...props} url={url} />
    ) : (
        <RouterLink href={url}>
            <Button {...props} url={url} />
        </RouterLink>
    );
};

//todo: add types support form component in map
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavigationItemsMap: Record<NavigationItemType, React.ComponentType<any>> = {
    [NavigationItemType.Button]: NavigationButton,
    [NavigationItemType.Social]: SocialIcon,
    [NavigationItemType.Dropdown]: NavigationDropdown,
    [NavigationItemType.Link]: NavigationLink,
};

const NavigationItem: React.FC<NavigationItemProps> = ({data, className, ...props}) => {
    const {type = NavigationItemType.Link} = data;
    const Component = NavigationItemsMap[type];
    const componentProps = useMemo(
        () => ({
            className: b({type}, className),
            ...data,
            ...props,
        }),
        [className, data, props, type],
    );

    return <Component {...componentProps} />;
};

export default NavigationItem;
