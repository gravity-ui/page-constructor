import {beforeMount} from '@playwright/experimental-ct-react/hooks';

import {Providers} from './Providers';
import './index.scss';

beforeMount(async ({App}) => {
    return (
        <Providers>
            <App />
        </Providers>
    );
});
