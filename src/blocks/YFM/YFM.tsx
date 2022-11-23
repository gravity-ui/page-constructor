import React from 'react';
import {YFMWrapper} from '@gravity-ui/page-constructor';
import block from 'bem-cn-lite';

import {Wrapper, PaddingSize} from '../../components/Wrapper/Wrapper';

const b = block('yfm');

export type YFMProps = {
    text: string;
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
};

export const YFM: React.FC<YFMProps> = (props) => {
    const {text, paddingTop, paddingBottom} = props;

    return (
        <Wrapper paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <YFMWrapper
                content={text}
                modifiers={{
                    blog: true,
                    resetPaddings: true,
                }}
                className={b({'no-list-reset': true})}
            />
        </Wrapper>
    );
};
