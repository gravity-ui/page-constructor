import * as React from 'react';

import {NavigationData} from '../../../models';
import {block, isHeaderSet, isLogoSet} from '../../../utils';
import Navigation from '../../components/Navigation/Navigation';

import './Layout.scss';

const b = block('layout');

export interface LayoutProps {
    navigation?: NavigationData;
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children, navigation}) => (
    <div className={b()}>
        {navigation &&
            (isLogoSet(navigation.logo) || isHeaderSet(navigation.header)) &&
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
