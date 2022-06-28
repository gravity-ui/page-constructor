import {i18n} from '../../../i18n';
import {Lang} from '../../../configure';

const COMPONENT = 'Text';

i18n.registerKeyset(Lang.En, COMPONENT, {
    constructor_read_all: 'Read more',
});

i18n.registerKeyset(Lang.Ru, COMPONENT, {
    constructor_read_all: 'Читать полностью',
});

export default i18n.keyset(COMPONENT);
