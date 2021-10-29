import {i18n, I18N} from '../../../i18n';

const COMPONENT = 'Loadable';

i18n.registerKeyset(I18N.LANGS.en, COMPONENT, {
    'loadable-load-error': '"Error occured',
});

i18n.registerKeyset(I18N.LANGS.ru, COMPONENT, {
    'loadable-load-error': 'Произошла ошибка',
});

i18n.registerKeyset(I18N.LANGS.en, COMPONENT, {
    'loadable-try-again': '"Try again',
});

i18n.registerKeyset(I18N.LANGS.ru, COMPONENT, {
    'loadable-try-again': 'Повторить',
});

export default i18n.keyset(COMPONENT);
