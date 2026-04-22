import type {PageConstructorExtension} from '../containers/PageConstructor/PageConstructor';
import {MediaProps, NavigationData, PageContent} from '../models';

export {
    GravityBlocksProvider,
    type GravityBlocksProviderProps,
} from '../gravity-blocks/context/GravityBlocksProvider';

import {
    GeneralExtension,
    BackgroundExtension,
    NavigationExtension,
    BlockBaseExtension,
} from '../gravity-blocks/extensions';

export {
    GeneralExtension,
    GeneralExtensionContentWrapper,
    type GeneralExtensionGlobalConfig,
    type GeneralExtensionWrapperProps,
    type GeneralPageContent,
    BackgroundExtension,
    BackgroundExtensionContentWrapper,
    type BackgroundExtensionGlobalConfig,
    type BackgroundExtensionWrapperProps,
    type BackgroundPageContent,
    NavigationExtension,
    NavigationExtensionContentWrapper,
    type NavigationExtensionGlobalConfig,
    type NavigationExtensionWrapperProps,
    type NavigationPageContent,
} from '../gravity-blocks/extensions';

interface GravityBlocksWrapperProps {
    isBranded?: boolean;
    animated?: boolean;
    renderMenu?: () => React.ReactNode;
    microdata?: {
        contentUpdatedDate?: string;
    };
}

interface GravityBlocksGlobalConfig {
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
export const GravityBlocksExtension = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: GravityBlocksWrapperProps;
    globalDefaults?: GravityBlocksGlobalConfig;
}): PageConstructorExtension<GravityBlocksGlobalConfig, GravityBlocksWrapperProps>[] => {
    const {background, navigation, isBranded, animated} = globalDefaults;

    return [
        GeneralExtension({
            globalDefaults: {isBranded, animated},
        }),
        BackgroundExtension({
            globalDefaults: {background},
        }),
        NavigationExtension({
            wrapperProps,
            globalDefaults: {navigation},
        }),
        BlockBaseExtension(),
    ];
};
