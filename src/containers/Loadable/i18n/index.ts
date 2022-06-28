import {i18n} from '../../../i18n';
import {Lang} from '../../../configure';

const COMPONENT = 'Loadable';

i18n.registerKeyset(Lang.En, COMPONENT, {
    'loadable-load-error': '"Error occured',
    'loadable-try-again': '"Try again',
});

i18n.registerKeyset(Lang.Ru, COMPONENT, {
    'loadable-load-error': 'Произошла ошибка',
    'loadable-try-again': 'Повторить',
});

export default i18n.keyset(COMPONENT);
