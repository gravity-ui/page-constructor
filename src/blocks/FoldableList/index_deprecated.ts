import {BlockData} from '../../constructor-items';

import FoldableListBlock from './FoldableList';
import {defaultValue, form} from './form';

const FoldableListBlockConfig: BlockData = {
    type: 'foldable-list-block',
    component: FoldableListBlock,
    schema: {
        name: 'Foldable List Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default FoldableListBlockConfig;
