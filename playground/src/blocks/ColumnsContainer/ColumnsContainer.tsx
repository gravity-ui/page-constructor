import * as React from 'react';

import ChildrenItemWrap from '../../../../src/components/editor/ChildrenItemWrap/ChildrenItemWrap';
import ChildrensWrap from '../../../../src/components/editor/ChildrensWrap/ChildrensWrap';

export type ColumnsCount = 2 | 3 | 4;
export type ColumnsGap = 's' | 'm' | 'l' | 'space-between';

const GAP_SIZE: Record<Exclude<ColumnsGap, 'space-between'>, number> = {
    s: 8,
    m: 16,
    l: 32,
};

export interface ColumnsContainerProps extends React.PropsWithChildren {
    columns?: ColumnsCount;
    gap?: ColumnsGap;
}

const ColumnsContainer: React.FC<ColumnsContainerProps> = ({columns = 2, gap = 'm', children}) => {
    const isSpaceBetween = gap === 'space-between';
    const gapPx = isSpaceBetween ? 0 : (GAP_SIZE[gap] ?? GAP_SIZE.m);

    return (
        <div style={{padding: '16px 24px', width: '100%', boxSizing: 'border-box'}}>
            <ChildrensWrap>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: isSpaceBetween ? undefined : gapPx,
                        justifyContent: isSpaceBetween ? 'space-between' : undefined,
                        columnGap: isSpaceBetween ? undefined : gapPx,
                        rowGap: isSpaceBetween ? gapPx : undefined,
                    }}
                >
                    {React.Children.map(children, (child, index) => (
                        <ChildrenItemWrap index={index}>{child}</ChildrenItemWrap>
                    ))}
                </div>
            </ChildrensWrap>
        </div>
    );
};

export default ColumnsContainer;
