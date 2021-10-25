import {StoryFn} from '@storybook/addons';
import {radios} from '@storybook/addon-knobs';
import {I18N} from '@yandex-data-ui/i18n';

function getLangControl() {
    const label = 'Language';
    const options = {
        ru: 'ru',
        en: 'en',
    };
    const defaultValue = 'ru';

    return radios(label, options, defaultValue);
}

export function withLang(story: StoryFn) {
    const lang = getLangControl();
    I18N.setLang(lang);

    return story();
}
