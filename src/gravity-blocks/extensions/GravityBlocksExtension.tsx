import type {PageConstructorExtension} from '../../containers/PageConstructor/PageConstructor';
import {MediaProps, NavigationData, PageContent} from '../../models';

export {
    GravityBlocksProvider,
    type GravityBlocksProviderProps,
} from '../context/GravityBlocksProvider';

import {GeneralExtensionGlobalConfig, GeneralExtensionWrapperProps} from './GeneralExtension';

import {backgroundExtension, blockBaseExtension, generalExtension, navigationExtension} from '.';

export interface GravityBlocksWrapperProps extends GeneralExtensionWrapperProps {
    renderMenu?: () => React.ReactNode;
}

export interface GravityBlocksGlobalConfig extends GeneralExtensionGlobalConfig {
    background?: MediaProps;
    navigation?: NavigationData;
}

export interface GravityPageContent extends PageContent, GravityBlocksGlobalConfig {}

/** @returns Array of PageConstructorExtension instances for gravity-blocks. */
export const gravityBlocksExtension = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: GravityBlocksWrapperProps;
    globalDefaults?: GravityBlocksGlobalConfig;
}): PageConstructorExtension<GravityBlocksGlobalConfig, GravityBlocksWrapperProps>[] => {
    const {background, navigation, ...generalGlobalDefaults} = globalDefaults;
    const {renderMenu, ...generalWrapperProps} = wrapperProps;

    return [
        generalExtension({
            wrapperProps: generalWrapperProps,
            globalDefaults: generalGlobalDefaults,
        }),
        backgroundExtension({
            globalDefaults: {background},
        }),
        navigationExtension({
            wrapperProps: {renderMenu},
            globalDefaults: {navigation},
        }),
        blockBaseExtension(),
    ];
};
