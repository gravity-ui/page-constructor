import {i18n, I18N} from '../../../i18n';

const COMPONENT = 'Share';

i18n.registerKeyset(I18N.LANGS.en, COMPONENT, {
    'constructor-share': 'Share',
});

i18n.registerKeyset(I18N.LANGS.ru, COMPONENT, {
    'constructor-share': 'Поделиться',
});

export default i18n.keyset(COMPONENT);
