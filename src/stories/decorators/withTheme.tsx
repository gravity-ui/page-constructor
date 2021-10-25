import {StoryFn} from '@storybook/addons';
import {radios} from '@storybook/addon-knobs';
import {useTheme} from '@yandex-data-ui/common';

function getThemeControl() {
    const label = 'Theme';
    const options = {
        Light: 'light',
        Dark: 'dark',
    };
    const defaultValue = 'light';

    return radios(label, options, defaultValue);
}

export function withTheme(story: StoryFn) {
    const themeValue = getThemeControl();
    const [theme, setTheme] = useTheme(); // eslint-disable-line react-hooks/rules-of-hooks

    if (theme !== themeValue) {
        setTheme(themeValue);
    }

    return story();
}
