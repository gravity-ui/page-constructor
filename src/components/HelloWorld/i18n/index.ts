import {i18n, I18N} from '../../i18n';

const COMPONENT = 'helloWorld';

i18n.registerKeyset(I18N.LANGS.en, COMPONENT, {
    text: 'Hello, World',
});

i18n.registerKeyset(I18N.LANGS.ru, COMPONENT, {
    text: 'Привет, Мир',
});

export default i18n.keyset(COMPONENT);
