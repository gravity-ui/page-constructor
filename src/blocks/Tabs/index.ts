import TabsBlock from './Tabs';
import {defaultValue, form} from './form';
import icon from './icon';

const TabsBlockConfig = {
    type: '@gravity-ui/page-constructor/tabs-block',
    component: TabsBlock,
    schema: {
        name: 'Tabs Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default TabsBlockConfig;
