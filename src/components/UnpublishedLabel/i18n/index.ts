import {i18n, I18N} from '../../../i18n';

const COMPONENT = 'UnpublishedLabel';

i18n.registerKeyset(I18N.LANGS.en, COMPONENT, {
    label_non_published: 'Unpublished',
});

i18n.registerKeyset(I18N.LANGS.ru, COMPONENT, {
    label_non_published: 'Не опубликовано',
});

export default i18n.keyset(COMPONENT);
