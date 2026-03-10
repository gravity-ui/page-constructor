import * as React from 'react';

import {Globe} from '@gravity-ui/icons';
import {Button, DropdownMenu, DropdownMenuItem, Icon} from '@gravity-ui/uikit';

import {block} from '../../../../utils';

import './LangSwitcher.scss';

const b = block('lang-switcher');

type LangSwitcherProps = {
    items: DropdownMenuItem[];
};

export const LangSwitcher = ({items}: LangSwitcherProps) => {
    return (
        <DropdownMenu
            items={items}
            switcherWrapperClassName={b('switcher-wrapper')}
            renderSwitcher={(props) => (
                <Button view="flat" size="m" className={b('switcher-button')} {...props}>
                    <Icon key="icon" data={Globe} size={20} />
                    Language
                </Button>
            )}
        />
    );
};
