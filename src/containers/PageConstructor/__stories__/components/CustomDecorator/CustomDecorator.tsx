import * as React from 'react';

import {Link} from '@gravity-ui/uikit';

import {yfmTransform} from '../../../../../../.storybook/utils';
import {BlockBase, YFMWrapper} from '../../../../../components';
import {BlockDecorator} from '../../../../../models';
import {cn} from '../../../../../utils';

import './CustomDecorator.scss';

const b = cn('custom-decorator');

const CUSTOM_DECORATOR_CODE = `
const customDecorator = ...;

const customConfig: CustomConfig = {
    ...
    decorators: {
        block: [customDecorator],
    },
};

...

<PageConstructor {...props} custom={customConfig} />
`
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const CUSTOM_DECORATOR_DESCRIPTION = `
**Custom decorators let you modify how blocks are displayed on the page. Every block on the page goes through them, but you can specify how different block types are handled.**

To create and use a custom decorator you need to:
1. Create your own decorator function
3. Add it to your \`CustomConfig\`
3. Pass this config to \`<PageConstructor />\`

Check out this Stories' \`content\` control to see page data.

The code block links to the current example's source.
`;

export const customDecorator: BlockDecorator = ({type, children}) => {
    if (type !== 'banner-block') {
        return children as React.ReactElement;
    }

    return (
        <BlockBase className={b()}>
            <div className={b('header')}>
                <div className={b('header-title')}>Custom Decorator</div>
                <div className={b('header-content')}>
                    <YFMWrapper content={yfmTransform(CUSTOM_DECORATOR_DESCRIPTION)} />
                    <Link href="https://github.com/gravity-ui/page-constructor/blob/main/src/containers/PageConstructor/__stories__/components/CustomBlocksTemplate.tsx">
                        <YFMWrapper
                            className={b('code')}
                            content={`<code>${CUSTOM_DECORATOR_CODE}</code>`}
                        />
                    </Link>
                </div>
            </div>
            <div className={b('content')}>{children}</div>
        </BlockBase>
    );
};
