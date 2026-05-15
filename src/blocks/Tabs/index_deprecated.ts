import TabsBlock from './Tabs';
import {defaultValue, form} from './form';
import icon from './icon';

const TabsBlockConfig = {
    type: 'tabs-block',
    component: TabsBlock,
    schema: {
        name: 'Tabs Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default TabsBlockConfig;
