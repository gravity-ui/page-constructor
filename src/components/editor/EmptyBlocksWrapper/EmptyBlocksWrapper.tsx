import * as React from 'react';

import {usePCEditorStore} from '../../../hooks/usePCEditorStore';
import usePCEditorBlockMouseEvents from '../../../hooks/usePCEditorBlockMouseEvents';
import {block} from '../../../utils';

import './EmptyBlocksWrapper.scss';

const b = block('empty-blocks-wrapper');

export interface EmptyBlocksWrapperProps {}

const EmptyBlocksWrapper = () => {
    const {
        initialized,
        content: {blocks},
    } = usePCEditorStore();
    const [element, setElement] = React.useState<HTMLElement | undefined>();

    const blockRef = React.useCallback((node: HTMLElement | null) => {
        if (node !== null) {
            setElement(node);
        }
    }, []);

    const adminBlockMouseEvents = usePCEditorBlockMouseEvents([0], element, true);

    if (!initialized || blocks.length > 0) {
        return null;
    }

    return (
        <div ref={blockRef} className={b()} {...adminBlockMouseEvents}>
            <div className={b('content')}>
                <div className={b('icon')}>+</div>
                <div className={b('text')}>Перетащите блок сюда</div>
                <div className={b('hint')}>Блоки находятся на панели слева</div>
            </div>
        </div>
    );
};

export default EmptyBlocksWrapper;
