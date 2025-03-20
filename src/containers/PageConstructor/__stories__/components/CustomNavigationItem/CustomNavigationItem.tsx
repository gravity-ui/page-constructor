import {Button, Link, Popover} from '@gravity-ui/uikit';
import {cn} from '../../../../../utils';
import './CustomNavigationItem.scss';
import {YFMWrapper} from '../../../../../components';
import {yfmTransform} from '../../../../../../.storybook/utils';

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
                            className={b('popover-content-description')}
                            content={yfmTransform(description)}
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
