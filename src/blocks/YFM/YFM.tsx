import React from 'react';
import {YFMWrapper} from '@gravity-ui/page-constructor';
import block from 'bem-cn-lite';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';

const b = block('yfm');

export type YFMProps = {
    text: string;
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const YFM: React.FC<YFMProps> = (props) => {
    const {text, paddingTop, paddingBottom} = props;

    return (
        <BlogWrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <YFMWrapper
                content={text}
                modifiers={{
                    blog: true,
                    resetPaddings: true,
                }}
                className={b({'no-list-reset': true})}
            />
        </BlogWrapper>
    );
};
