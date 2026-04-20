import * as React from 'react';

import {Link} from '@gravity-ui/uikit';

import {yfmTransform} from '../../../../../../.storybook/utils';
import {BlockBase, YFMWrapper} from '../../../../../components';
import {BlockWrapperDataProps} from '../../../../../models';
import {cn} from '../../../../../utils';
import {PageConstructorExtension} from '../../../PageConstructor';

import './CustomDecorator.scss';

const b = cn('custom-decorator');

const CUSTOM_DECORATOR_CODE = `
const CustomDecoratorWrapper = ({type, children}) => {
    if (type !== 'banner-block') {
        return <React.Fragment>{children}</React.Fragment>;
    }
    return <div className="custom-wrapper">{children}</div>;
};

const customExtension = () => ({
    name: 'Custom Decorator',
    id: 'my-app/custom-decorator',
    settings: {
        blockWrapper: CustomDecoratorWrapper,
    },
});

<PageConstructor extensions={[BlockBaseExtension(), customExtension()]} />
`
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const CUSTOM_DECORATOR_DESCRIPTION = `
**Block wrapper extensions let you modify how blocks are displayed on the page. Every block goes through them, but you can specify how different block types are handled.**

To create and use a custom block wrapper extension you need to:
1. Create a wrapper component that receives \`type\`, \`index\`, all block data props, and \`children\`
2. Create an extension factory that returns a \`PageConstructorExtension\` with \`blockWrapper\`
3. Pass it to \`<PageConstructor extensions={[...]} />\`

Check out this Stories' \`content\` control to see page data.

The code block links to the current example's source.
`;

export const CustomDecoratorBlockWrapper: React.FC<
    BlockWrapperDataProps & React.PropsWithChildren
> = ({type, children}) => {
    if (type !== 'banner-block') {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return (
        <BlockBase className={b()}>
            <div className={b('header')}>
                <div className={b('header-title')}>Custom Decorator</div>
                <div className={b('header-content')}>
                    <YFMWrapper content={yfmTransform(CUSTOM_DECORATOR_DESCRIPTION)} />
                    <Link href="https://github.com/gravity-ui/page-constructor/blob/main/src/containers/PageConstructor/__stories__/components/CustomBlocksTemplate.tsx">
                        <YFMWrapper
                            contentClassName={b('code')}
                            content={`<code>${CUSTOM_DECORATOR_CODE}</code>`}
                        />
                    </Link>
                </div>
            </div>
            <div className={b('content')}>{children}</div>
        </BlockBase>
    );
};

export const customDecoratorExtension = (): PageConstructorExtension => ({
    name: 'Custom Decorator',
    id: 'page-constructor-stories/custom-decorator',
    settings: {
        blockWrapper: CustomDecoratorBlockWrapper,
    },
});
