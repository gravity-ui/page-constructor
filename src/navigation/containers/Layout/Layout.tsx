import * as React from 'react';

import {NavigationData} from '../../../models';
import {block} from '../../../utils';
import Navigation from '../../components/Navigation/Navigation';

import './Layout.scss';

const b = block('layout');

export interface LayoutProps {
    navigation?: NavigationData;
    children?: React.ReactNode;
}

const Layout = ({children, navigation}: React.PropsWithChildren<LayoutProps>) => (
    <div className={b()}>
        {navigation &&
            (navigation.renderNavigation ? (
                navigation.renderNavigation()
            ) : (
                <Navigation
                    data={navigation.header}
                    logo={navigation.logo}
                    className={b('navigation')}
                />
            ))}
        <main className={b('content')}>{children}</main>
    </div>
);

export default Layout;
