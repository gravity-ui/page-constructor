import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';
import {I18N} from '@yandex-cloud/i18n';

I18N.setDefaultLang(I18N.LANGS.ru);

export function withLang(Story: StoryType, context: StoryContext) {
    const lang = context.globals.lang || 'ru';
    I18N.setDefaultLang(lang);

    return <Story {...context} />;
}
