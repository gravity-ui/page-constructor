import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';
import {I18N} from '@yandex-data-ui/i18n';

export function withLang(Story: StoryType, context: StoryContext) {
    const lang = context.globals.lang;
    I18N.setLang(lang);

    return <Story {...context} />;
}
