import type {PageConstructorExtension} from '../../containers/PageConstructor/PageConstructor';
import {MediaProps, NavigationData, PageContent} from '../../models';

export {
    GravityBlocksProvider,
    type GravityBlocksProviderProps,
} from '../context/GravityBlocksProvider';

import {backgroundExtension, blockBaseExtension, generalExtension, navigationExtension} from '.';

export interface GravityBlocksWrapperProps {
    isBranded?: boolean;
    animated?: boolean;
    renderMenu?: () => React.ReactNode;
    microdata?: {
        contentUpdatedDate?: string;
    };
}

export interface GravityBlocksGlobalConfig {
    background?: MediaProps;
    navigation?: NavigationData;
    isBranded?: boolean;
    animated?: boolean;
}

export interface GravityPageContent extends PageContent, GravityBlocksGlobalConfig {}

/**
 * Convenience factory that creates all Gravity extensions at once.
 * Returns an array of extensions: [General, Background, Navigation]
 * Order matters: General wraps Background, which wraps Navigation.
 */
export const gravityBlocksExtension = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: GravityBlocksWrapperProps;
    globalDefaults?: GravityBlocksGlobalConfig;
}): PageConstructorExtension<GravityBlocksGlobalConfig, GravityBlocksWrapperProps>[] => {
    const {background, navigation, isBranded, animated} = globalDefaults;

    return [
        generalExtension({
            globalDefaults: {isBranded, animated},
        }),
        backgroundExtension({
            globalDefaults: {background},
        }),
        navigationExtension({
            wrapperProps,
            globalDefaults: {navigation},
        }),
        blockBaseExtension(),
    ];
};
