import * as React from 'react';

import {TriangleUp} from '@gravity-ui/icons';
import {Button} from '@gravity-ui/uikit';

import {cn} from '../../../utils';
import {NavigationItemProps} from '../../models';

import './CustomButton.scss';

const b = cn('custom-button');

type DCDropdownNavigationItemProps = Pick<NavigationItemProps, 'onClick' | 'isActive'>;

export const CustomButton = (props: React.PropsWithChildren<DCDropdownNavigationItemProps>) => {
    const {onClick, isActive} = props;

    return (
        <Button size="l" view="flat" className={b({active: isActive})} onClick={onClick}>
            <Button.Icon>
                <TriangleUp height={20} width={20} />
            </Button.Icon>
        </Button>
    );
};
