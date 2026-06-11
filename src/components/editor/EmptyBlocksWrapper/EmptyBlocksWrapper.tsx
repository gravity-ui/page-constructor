import {usePCEditorBlockRegister} from '../../../hooks/usePCEditorBlockRegister';
import {usePCEditorStore} from '../../../hooks/usePCEditorStore';
import {block} from '../../../utils';

import './EmptyBlocksWrapper.scss';

const b = block('empty-blocks-wrapper');

export interface EmptyBlocksWrapperProps {}

const EMPTY_DROP_PATH = [0];

const EmptyBlocksWrapper = () => {
    const {
        initialized,
        content: {blocks},
    } = usePCEditorStore();

    const blockRef = usePCEditorBlockRegister(EMPTY_DROP_PATH);

    if (!initialized || blocks.length > 0) {
        return null;
    }

    return (
        <div ref={blockRef} className={b()}>
            <div className={b('content')}>
                <div className={b('icon')}>+</div>
                <div className={b('text')}>Перетащите блок сюда</div>
                <div className={b('hint')}>Блоки находятся на панели слева</div>
            </div>
        </div>
    );
};

export default EmptyBlocksWrapper;
