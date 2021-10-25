import React from 'react';

import {Demo} from '../components/Demo/Demo';
import {HelloWorld} from '../../components/HelloWorld';

export {default as WelcomeFormReadme} from '../../components/HelloWorld/README.md';

const Wrapper: React.FC = ({children}) => (
    <div style={{border: '1px solid var(--yc-color-line-generic)', width: '480px'}}>{children}</div>
);

export function HelloWorldDemo() {
    return (
        <Demo title="HelloWorld">
            <Demo.Row title="">
                <Wrapper>
                    <HelloWorld />
                </Wrapper>
            </Demo.Row>
        </Demo>
    );
}
