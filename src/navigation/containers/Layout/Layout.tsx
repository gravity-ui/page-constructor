import React from 'react';

import {NavigationData} from '../../../models';
import {block} from '../../../utils';
import Navigation from '../../components/Navigation/Navigation';

import './Layout.scss';

const b = block('layout');

export interface LayoutProps {
    navigation?: NavigationData;
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children, navigation}) => (
    <div className={b()}>
        {navigation && <Navigation data={navigation.header} logo={navigation.logo} />}
        <main className={b('content')}>{children}</main>
    </div>
);

export default Layout;
