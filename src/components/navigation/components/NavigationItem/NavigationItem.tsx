import React, {Fragment, MouseEventHandler, useContext, useMemo} from 'react';
import block from 'bem-cn-lite';

import {RouterLink, ToggleArrow} from '../../../index';
import {getLinkProps} from '../../../../utils';
import {LocationContext} from '../../../../context/locationContext';
import {
    NavigationButtonItem,
    NavigationDropdownItem,
    NavigationItemType,
    NavigationSocialItem,
    NavigationLinkItem,
} from '../../../../models/navigation';
import {NavigationArrow} from '../../../../icons';
import SocialIcon from '../SocialIcon/SocialIcon';

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

const Content: React.FC<{text: string; icon?: string}> = ({text, icon}) => (
    <Fragment>
        {icon && <img className={b('icon')} src={icon} />}
        <span className={b('text')}>{text}</span>
    </Fragment>
);

type NavigationDropdownProps = NavigationItemProps & DropdownItemData;

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
    text,
    icon,
    isOpened,
    ...props
}) => (
    <span {...props}>
        <Content text={text} icon={icon} />
        <ToggleArrow
            className={b('dropdown')}
            size={12}
            type={'vertical'}
            iconType="navigation"
            open={isOpened}
        />
    </span>
);

type NavigationLinkProps = NavigationItemProps & NavigationLinkItem;

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
    const {hostname} = useContext(LocationContext);
    const {url, text, icon, arrow, target, ...rest} = props;
    const linkExtraProps = getLinkProps(url, hostname, target);

    const content = (
        <Fragment>
            <Content text={text} icon={icon} />
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

//todo: add types support form component in map
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavigationItemsMap: Record<NavigationItemType, React.ComponentType<any>> = {
    [NavigationItemType.Button]: RouterLink,
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
