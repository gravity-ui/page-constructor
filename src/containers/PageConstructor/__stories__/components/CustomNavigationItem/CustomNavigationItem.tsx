import {Button, Link, Popover} from '@gravity-ui/uikit';

import {yfmTransform} from '../../../../../../.storybook/utils';
import {YFMWrapper} from '../../../../../components';
import {cn} from '../../../../../utils';

import './CustomNavigationItem.scss';

const b = cn('custom-navigation-item');

const CUSTOM_NAVIGATION_ITEM_CODE = `
const CustomNavigationItem = ...;

const customConfig: CustomConfig = {
    ...
    navigation: {
        ['custom-navigation-item']: CustomNavigationItem,
    },
};

...

<PageConstructor {...props} custom={customConfig} />
`
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

interface CustomNavigationItemProps {
    url?: string;
    title?: string;
    description?: string;
}

export const CustomNavigationItem = ({url, title, description}: CustomNavigationItemProps) => {
    const Wrapper = url ? Link : 'div';

    return (
        <Popover
            className={b('popover')}
            trigger="click"
            content={
                <div className={b('popover-content')}>
                    {description && (
                        <YFMWrapper
                            contentClassName={b('popover-content-description')}
                            content={yfmTransform(description)}
                            tagName="div"
                        />
                    )}
                    <Wrapper className={b('popover-content-code')} href={url ?? ''}>
                        <YFMWrapper content={`<code>${CUSTOM_NAVIGATION_ITEM_CODE}</code>`} />
                    </Wrapper>
                </div>
            }
        >
            <Button className={b()} view="flat" size="xl">
                {title}
            </Button>
        </Popover>
    );
};
