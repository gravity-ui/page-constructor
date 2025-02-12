import * as React from 'react';

import useHeightCalculator from '../../hooks/useHeightCalculator';
import {QAProps} from '../../models';
import {block, getQaAttrubutes} from '../../utils';

import './Foldable.scss';

const b = block('foldable-block');

export interface FoldableProps extends QAProps {
    isOpened: boolean;
    className?: string;
}

const Foldable = ({isOpened, children, className, qa}: React.PropsWithChildren<FoldableProps>) => {
    const qaAttributes = getQaAttrubutes(qa);
    const blockRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const contentHeight = useHeightCalculator(contentRef);

    React.useEffect(() => {
        if (blockRef && blockRef.current) {
            blockRef.current.style.height = isOpened && contentHeight ? `${contentHeight}px` : '0';
        }
    }, [isOpened, contentHeight]);

    return (
        <div
            ref={blockRef}
            className={b({open: isOpened}, className)}
            data-qa={qaAttributes.default}
        >
            <div
                ref={contentRef}
                className={b('content-container')}
                data-qa={qaAttributes.container}
            >
                {children}
            </div>
        </div>
    );
};

export default Foldable;
