import * as React from 'react';

import {InnerContext} from '../../../../context/innerContext';
import {usePCEditorChildrenItemWrap} from '../../../../hooks/usePCEditorChildrenItemWrap';
import {ConstructorBlock as ConstructorBlockType} from '../../../../models';

import './ConstructorBlock.scss';

interface ConstructorBlockProps {
    index?: number;
    data: ConstructorBlockType;
}

export const ConstructorBlock = ({
    index = 0,
    data,
    children,
}: React.PropsWithChildren<ConstructorBlockProps>) => {
    const {blockRef} = usePCEditorChildrenItemWrap(index);
    const {blockWrappers = []} = React.useContext(InnerContext);

    const wrappedContent = blockWrappers.reduce<React.ReactNode>(
        (content, {wrapper: Wrapper, props}) => (
            <Wrapper type={data.type} props={props} content={data as any} index={index}>
                {content}
            </Wrapper>
        ),
        children,
    );

    return <div ref={blockRef}>{wrappedContent}</div>;
};
