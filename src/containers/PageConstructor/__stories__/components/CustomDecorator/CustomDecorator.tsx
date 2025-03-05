import * as React from 'react';
import {BlockDecorator} from '../../../../../models';
import {cn} from '../../../../../utils';

import './CustomDecorator.scss';
import {BlockBase, YFMWrapper} from '../../../../../components';
import {Link, Popover} from '@gravity-ui/uikit';

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

export const customDecorator: BlockDecorator = ({type, children}) => {
    if (type !== 'banner-block') {
        return children as React.ReactElement;
    }

    return (
        <BlockBase className={b()}>
            <Popover
                placement="bottom-start"
                className={b('popover')}
                content={
                    <Link href="https://github.com/gravity-ui/page-constructor/blob/main/src/containers/PageConstructor/__stories__/components/CustomBlocksTemplate.tsx">
                        <YFMWrapper
                            className={b('yfm')}
                            content={`<code>${CUSTOM_DECORATOR_CODE}</code>`}
                        />
                    </Link>
                }
            >
                <div className={b('title')}>Custom Decorator</div>
            </Popover>
            <div className={b('content')}>{children}</div>
        </BlockBase>
    );
};
