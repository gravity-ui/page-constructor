import '@yandex-data-ui/common/styles/styles.scss';

import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {configure, addDecorator, addParameters} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import {addReadme} from 'storybook-readme';
import {ThemeProvider} from '@yandex-data-ui/common';
import {MobileProvider} from '@yandex-data-ui/common';
import {withLang} from '../src/stories/decorators/withLang';
import {withTheme} from '../src/stories/decorators/withTheme';
import {withMobile} from '../src/stories/decorators/withMobile';

addParameters({
    options: {
        panelPosition: 'right',
        theme: {
            brandTitle: 'Page Constructor',
            brandUrl: 'https://github.yandex-team.ru/data-ui/page-constructor',
        },
    },
});
addDecorator(addReadme);
addDecorator(withKnobs);
addDecorator(withTheme);
addDecorator(withLang);
addDecorator(withMobile);

addDecorator((Story, context) => (
    <main>
        <Router>
            <MobileProvider mobile={false} platform={'browser'}>
                <ThemeProvider>
                    <Story {...context} />
                </ThemeProvider>
            </MobileProvider>
        </Router>
    </main>
));

configure(require.context('../src/stories', true, /\.stories.tsx?$/), module);
