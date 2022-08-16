import React from 'react';
import type {RegionalEnvironmentConfig} from '@yandex-data-ui/cloud-regional-configs';

export interface RegionalConfigProps
    extends Pick<RegionalEnvironmentConfig, 'hosts' | 'appTitle' | 'legalName' | 'supportEmail'> {
    styles: Pick<RegionalEnvironmentConfig, 'layoutInlineStyleSheets' | 'layoutLinks'> & {
        assetPath?: string;
    };
    marketplaceExcludeDashboards: string[];
}

export const RegionalConfigContext = React.createContext<RegionalConfigProps>({
    appTitle: '',
    hosts: {},
    styles: {layoutInlineStyleSheets: [], layoutLinks: []},
    marketplaceExcludeDashboards: [],
});
