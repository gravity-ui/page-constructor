import React from 'react';
import {storiesOf} from '@storybook/react';

import {HelloWorldDemo, WelcomeFormReadme} from './demo/HelloWorld';

storiesOf('Components', module).add('HelloWorld', () => <HelloWorldDemo />, {
    readme: {sidebar: WelcomeFormReadme},
});
