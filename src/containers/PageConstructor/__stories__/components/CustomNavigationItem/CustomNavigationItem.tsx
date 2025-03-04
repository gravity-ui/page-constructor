import {Button, Link, Popover} from '@gravity-ui/uikit';
import {cn} from '../../../../../utils';
import './CustomNavigationItem.scss';
import {YFMWrapper} from '../../../../../components';

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
}

export const CustomNavigationItem = ({url, title}: CustomNavigationItemProps) => {
    const Wrapper = url ? Link : 'div';

    return (
        <Popover
            trigger="click"
            content={
                <Wrapper className={b('popover-content')} href={url ?? ''}>
                    <YFMWrapper content={`<code>${CUSTOM_NAVIGATION_ITEM_CODE}</code>`} />
                </Wrapper>
            }
        >
            <Button className={b()} view="flat" size="xl">
                {title}
            </Button>
        </Popover>
    );
};
