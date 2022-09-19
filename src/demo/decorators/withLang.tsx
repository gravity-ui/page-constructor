import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';

import {Lang} from '../../models/locale';

import {configure} from '../../configure';

configure({lang: Lang.Ru});

export function withLang(Story: StoryType, context: StoryContext) {
    const lang = context.globals.lang || Lang.Ru;
    configure({lang});

    return <Story {...context} />;
}
