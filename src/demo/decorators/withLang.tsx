import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';
import {i18n} from 'src/i18n';
import {Lang} from 'models/locale';

i18n.setLang(Lang.Ru);

export function withLang(Story: StoryType, context: StoryContext) {
    const lang = context.globals.lang || Lang.Ru;
    i18n.setLang(lang);

    return <Story {...context} />;
}
