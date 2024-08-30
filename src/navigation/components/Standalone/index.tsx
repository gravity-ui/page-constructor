import React from 'react';

import RootCn from '../../../components/RootCn';

import Navigation, {NavigationComponentProps} from './../../components/Navigation/Navigation';

const Standalone = (props: NavigationComponentProps) => (
    <RootCn>
        <Navigation {...props} />
    </RootCn>
);

export default Standalone;
