import {i18n} from '../../../i18n';
import {Lang} from '../../../configure';

const COMPONENT = 'UnpublishedLabel';

i18n.registerKeyset(Lang.En, COMPONENT, {
    label_non_published: 'Unpublished',
});

i18n.registerKeyset(Lang.Ru, COMPONENT, {
    label_non_published: 'Не опубликовано',
});

export default i18n.keyset(COMPONENT);
