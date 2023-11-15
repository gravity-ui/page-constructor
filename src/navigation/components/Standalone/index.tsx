import React from 'react';

import RootCn from '../../../components/RootCn';

import Navigation, {NavigationProps} from './../../components/Navigation/Navigation';

const Standalone = (props: NavigationProps) => (
    <RootCn>
        <Navigation {...props} />
    </RootCn>
);

export default Standalone;
