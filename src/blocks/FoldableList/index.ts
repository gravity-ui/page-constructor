import {BlockData} from '../../constructor-items';

import FoldableListBlock from './FoldableList';
import {defaultValue, form} from './form';

const FoldableListBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/foldable-list-block',
    component: FoldableListBlock,
    schema: {
        name: 'Foldable List Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default FoldableListBlockConfig;
