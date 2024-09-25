import React, {Fragment, useRef} from 'react';

import {ToggleArrow} from '../../../../../components';
import {getMediaImage} from '../../../../../components/Media/Image/utils';
import {NavigationDropdownItem} from '../../../../../models';
import {block} from '../../../../../utils';
import {NavigationItemProps} from '../../../../models';
import NavigationPopup from '../../../NavigationPopup/NavigationPopup';
import {ContentWrapper} from '../ContentWrapper/ContentWrapper';

import './NavigationDropdown.scss';

const b = block('navigation-dropdown');

const TOGGLE_ARROW_SIZE = 12;

type NavigationDropdownProps = NavigationItemProps & NavigationDropdownItem;

export const NavigationDropdown = ({
    text,
    icon,
    className,
    iconSize,
    hidePopup,
    items,
    isActive,
    ...props
}: NavigationDropdownProps) => {
    const iconData = icon && getMediaImage(icon);
    const anchorRef = useRef<HTMLButtonElement>(null);
    return (
        <Fragment>
            <button
                ref={anchorRef}
                {...props}
                type="button"
                className={b(null, className)}
                aria-expanded={isActive}
            >
                <ContentWrapper
                    text={text}
                    icon={iconData}
                    iconSize={iconSize}
                    aria-expanded={isActive}
                />
                <ToggleArrow
                    className={b('arrow')}
                    size={TOGGLE_ARROW_SIZE}
                    type={'vertical'}
                    iconType="navigation"
                    open={isActive}
                />
            </button>
            <NavigationPopup
                open={isActive}
                onClose={hidePopup}
                items={items}
                anchorRef={anchorRef}
            />
        </Fragment>
    );
};
