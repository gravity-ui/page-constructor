import * as React from 'react';

import '@diplodoc/transform/dist/js/yfm';

import type {PageConstructorWrapper} from '../../common/types';
import RootCn from '../../components/RootCn';
import {BlockData, blockMap, navItemMap, subBlockMap} from '../../constructor-items';
import {BlockRegistryContext, useBlockRegistryProvider} from '../../context/blockRegistryContext';
import {BlocksContext} from '../../context/blocksContext';
import {InnerContext} from '../../context/innerContext';
import {Fields} from '../../form-generator-v2/types';
import {usePCEditorInitializeEvents} from '../../hooks/usePCEditorInitializeEvents';
import {usePCEditorStore} from '../../hooks/usePCEditorStore';
import {CustomConfig, CustomItems, PageContent, ShouldRenderBlock} from '../../models';
import {block as cnBlock, getCustomItems} from '../../utils';

export interface PageConstructorExtension<
    GlobalConfig extends Object = {},
    WrapperProps extends Object = {},
> {
    name: string;
    id: string;
    settings: {
        ContentWrapper?: PageConstructorWrapper<WrapperProps>;
        contentWrapperProps?: WrapperProps;
        globalInputs?: Fields;
        globalDefaults?: GlobalConfig;
    };
}

/**
 * @deprecated Use PageConstructorExtension instead
 */
export type PageConstructorPlugin<
    GlobalConfig extends Object = {},
    WrapperProps extends Object = {},
> = PageConstructorExtension<GlobalConfig, WrapperProps>;

import {ConstructorBlocks} from './components';
import {ConstructorRow} from './components/ConstructorRow';

import './PageConstructor.scss';

const b = cnBlock('page-constructor');

export type ItemMap = typeof blockMap & typeof subBlockMap & CustomItems;

export type NavItemMap = typeof navItemMap & CustomItems;

export interface PageConstructorProps {
    content?: PageContent;
    shouldRenderBlock?: ShouldRenderBlock;
    custom?: CustomConfig;
    microdata?: {
        contentUpdatedDate?: string;
    };
    blocks?: Array<BlockData>;
    extensions?: Array<PageConstructorExtension>;
    /**
     * @deprecated Use extensions instead
     */
    plugins?: Array<PageConstructorExtension>;
}

export const PageConstructor = (props: PageConstructorProps) => {
    const {
        content: {blocks = []} = {},
        shouldRenderBlock,
        custom,
        microdata,
        blocks: availableLocalBlocks = [],
        extensions: extensionsProp,
        plugins: pluginsProp,
    } = props;

    // Support both extensions (new) and plugins (deprecated) for backward compatibility
    const extensions = extensionsProp ?? pluginsProp ?? [];

    const {blocks: availableGlobalBlocks} = React.useContext(BlocksContext);

    const availableBlocks = React.useMemo(
        () => [...availableGlobalBlocks, ...availableLocalBlocks],
        [availableGlobalBlocks, availableLocalBlocks],
    );

    const globalDefaults = extensions.reduce(
        (acc, extension) => ({
            ...acc,
            ...(extension.settings.globalDefaults || {}),
        }),
        {},
    );

    const initialContent = {
        ...globalDefaults,
        blocks,
    };

    const [content, setContent] = React.useState<PageContent>(initialContent);

    const store = usePCEditorStore();
    const {initialized} = store;

    const blockRegistry = useBlockRegistryProvider();

    usePCEditorInitializeEvents({
        initialContent: content,
        setContent,
        blocks: availableBlocks,
        global: extensions.reduce<Fields>(
            (acc, extension) => [...acc, ...((extension.settings.globalInputs || []) as Fields)],
            [],
        ),
        registry: blockRegistry,
    });

    const context = React.useMemo(
        () => ({
            blocks: availableBlocks,
            navItemMap: {
                ...navItemMap,
                ...getCustomItems(['navigation'], custom),
            },
            loadables: custom?.loadable,
            shouldRenderBlock,
            customization: {
                decorators: custom?.decorators,
            },
            microdata,
            content,
            setContent,
        }),
        [custom, shouldRenderBlock, microdata, availableBlocks, content, setContent],
    );

    const restBlocks = content.blocks;

    const blocksContent = restBlocks && (
        <ConstructorRow>
            <ConstructorBlocks items={restBlocks} />
        </ConstructorRow>
    );

    // Apply extensions (wrappers) from outermost to innermost
    const wrappedContent = extensions.reduceRight<React.ReactNode>(
        (children, extension) =>
            extension.settings.ContentWrapper ? (
                <extension.settings.ContentWrapper
                    {...(extension.settings.contentWrapperProps || {})}
                >
                    {children}
                </extension.settings.ContentWrapper>
            ) : (
                children
            ),
        blocksContent || null,
    );

    return (
        <BlockRegistryContext.Provider value={blockRegistry}>
            <InnerContext.Provider value={context}>
                <RootCn className={b('', {['with-editor']: initialized})}>{wrappedContent}</RootCn>
            </InnerContext.Provider>
        </BlockRegistryContext.Provider>
    );
};
