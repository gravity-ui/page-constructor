import {useMobile} from '@yandex-data-ui/common';

import {StoryFn} from '@storybook/addons';
import {boolean} from '@storybook/addon-knobs';

function getMobileValue() {
    const label = 'Mobile';

    return boolean(label, false);
}

export function withMobile(story: StoryFn) {
    const isMobile = getMobileValue();

    const [mobile, setMobile] = useMobile(); // eslint-disable-line react-hooks/rules-of-hooks

    if (mobile !== isMobile) {
        setMobile(isMobile);
    }

    return story();
}
