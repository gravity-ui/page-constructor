import React from 'react';
import block from 'bem-cn-lite';

import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import './BlogWrapper.scss';

const b = block('BlogWrapper');

export type PaddingSize = 'xs' | 's' | 'm' | 'l' | 'xl';

type WrapperProps = ClassNameProps & {
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
    dataQa?: string;
};

export const BlogWrapper: React.FunctionComponent<WrapperProps> = ({
    children,
    paddingTop = 'xs',
    paddingBottom = 'm',
    className,
    dataQa,
}) => (
    <section
        className={b(
            {
                ['padding-top']: paddingTop,
                ['padding-bottom']: paddingBottom,
            },
            className,
        )}
        data-qa={dataQa}
    >
        {children}
    </section>
);
