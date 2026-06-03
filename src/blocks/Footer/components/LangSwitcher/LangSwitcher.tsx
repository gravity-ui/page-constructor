import * as React from 'react';

import {Globe} from '@gravity-ui/icons';
import {Button, DropdownMenu, DropdownMenuItem, Icon, Text} from '@gravity-ui/uikit';

import ToggleArrow from '../../../../components/ToggleArrow/ToggleArrow';
import {block} from '../../../../utils';

import './LangSwitcher.scss';

const b = block('lang-switcher');

type LangSwitcherProps = {
    switcherText?: string;
    items: DropdownMenuItem[];
};

export const LangSwitcher = ({switcherText = 'Language', items}: LangSwitcherProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <DropdownMenu
            items={items}
            popupProps={{placement: 'top-start'}}
            switcherWrapperClassName={b('switcher-wrapper')}
            onOpenToggle={setIsOpen}
            renderSwitcher={(props) => (
                <Button view="flat" size="m" className={b('switcher-button')} {...props}>
                    <Icon key="icon" data={Globe} size={20} />
                    <Text variant="body-2" className={b('switcher-text')}>
                        {switcherText}
                    </Text>
                    <ToggleArrow
                        className={b('arrow')}
                        size={12}
                        type={'vertical'}
                        iconType="navigation"
                        open={isOpen}
                    />
                </Button>
            )}
        />
    );
};
