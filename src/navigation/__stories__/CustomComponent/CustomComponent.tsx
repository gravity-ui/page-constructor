import {useActionHandlers} from '@gravity-ui/uikit';

import {cn} from '../../../utils';
import {NavigationItemProps} from '../../models';

import './CustomComponent.scss';

const b = cn('custom-nav-item');

type DCDropdownNavigationItemProps = Pick<
    NavigationItemProps,
    'onClick' | 'isActive' | 'menuLayout'
>;

export const CustomComponent = (props: DCDropdownNavigationItemProps) => {
    const {onClick, isActive, menuLayout} = props;

    const {onKeyDown} = useActionHandlers(onClick);

    return (
        <div
            className={b({active: isActive})}
            onClick={onClick}
            onKeyDown={onKeyDown}
            tabIndex={onClick ? 0 : -1}
            role={onClick ? 'button' : 'group'}
        >
            {`Custom Item (${menuLayout}${isActive ? ' - active' : ''})`}
        </div>
    );
};
