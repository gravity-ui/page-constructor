import {i18n} from '../../../i18n';
import {Lang} from '../../../configure';

const COMPONENT = 'Share';

i18n.registerKeyset(Lang.En, COMPONENT, {
    'constructor-share': 'Share',
});

i18n.registerKeyset(Lang.Ru, COMPONENT, {
    'constructor-share': 'Поделиться',
});

export default i18n.keyset(COMPONENT);
