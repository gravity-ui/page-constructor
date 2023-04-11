import React from 'react';

import {ToggleArrow} from '../../../../../components';
import {getMediaImage} from '../../../../../components/Media/Image/utils';
import {DropdownItemData} from '../../../../../models';
import {block} from '../../../../../utils';
import {NavigationItemProps} from '../../NavigationItem';
import {ContentWrapper} from '../ContentWrapper/ContentWrapper';

import './NavigationDropdown.scss';

const b = block('navigation-dropdown');

const TOGGLE_ARROW_SIZE = 12;

type NavigationDropdownProps = NavigationItemProps & DropdownItemData;

export const NavigationDropdown = React.forwardRef<HTMLElement, NavigationDropdownProps>(
    ({text, icon, isOpened, className, ...props}, ref) => {
        const iconData = icon && getMediaImage(icon);

        return (
            <span ref={ref} {...props} className={b(null, className)}>
                <ContentWrapper text={text} icon={iconData} />
                <ToggleArrow
                    className={b('arrow')}
                    size={TOGGLE_ARROW_SIZE}
                    type={'vertical'}
                    iconType="navigation"
                    open={isOpened}
                />
            </span>
        );
    },
);
NavigationDropdown.displayName = 'NavigationDropdown';
