import {Lang, configure as uiKitConfigure} from '@gravity-ui/uikit';
import {configure} from '@testing-library/dom';

global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};

uiKitConfigure({
    lang: Lang.En,
});

configure({testIdAttribute: 'data-qa'});
