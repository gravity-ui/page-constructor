import {i18n, I18N} from '../../../i18n';

const COMPONENT = 'Text';

i18n.registerKeyset(I18N.LANGS.en, COMPONENT, {
    constructor_read_all: 'Read more',
});

i18n.registerKeyset(I18N.LANGS.ru, COMPONENT, {
    constructor_read_all: 'Читать полностью',
});

export default i18n.keyset(COMPONENT);
