import React from 'react';
import block from 'bem-cn-lite';

import {NavigationData} from '../../../../models';
import Header from '../../components/Header/Header';

import './Layout.scss';

const b = block('layout');

export interface LayoutProps {
    navigation?: NavigationData;
}

const Layout: React.FC<LayoutProps> = ({children, navigation}) => (
    <div className={b()}>
        {navigation && <Header data={navigation.header} logo={navigation.logo} />}
        <main className={b('content')}>{children}</main>
    </div>
);

export default Layout;
