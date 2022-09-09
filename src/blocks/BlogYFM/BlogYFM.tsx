import React from 'react';
import {YFMWrapper} from '@yandex-data-ui/page-constructor';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';

import './BlogYFM.scss';

type YFMBlockProps = {
    text: string;
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export type YFMBlockFullProps = YFMBlockProps;

export const YFMBlock: React.FC<YFMBlockFullProps> = (props) => {
    const {text, paddingTop, paddingBottom} = props;

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <YFMWrapper
                content={text}
                modifiers={{
                    blog: true,
                    resetPaddings: true,
                }}
            />
        </BlogWrapper>
    );
};
