import React from 'react';
import {Story as StoryType, StoryContext} from '@storybook/react/types-6-0';

import {Lang} from '../../src/models/locale';

import {configure} from '../../src/configure';

configure({lang: Lang.En});

export function withLang(Story: StoryType, context: StoryContext) {
    const lang = context.globals.lang || Lang.En;
    configure({lang});

    return <Story {...context} />;
}
