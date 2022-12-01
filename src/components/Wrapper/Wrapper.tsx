import React from 'react';

import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {block} from '../../utils/cn';

import './Wrapper.scss';

const b = block('wrapper');

export type PaddingSize = 'xs' | 's' | 'm' | 'l' | 'xl';

type WrapperProps = ClassNameProps & {
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
    dataQa?: string;
};

export const Wrapper: React.FunctionComponent<WrapperProps> = ({
    children,
    paddingTop = 'xs',
    paddingBottom = 'l',
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
