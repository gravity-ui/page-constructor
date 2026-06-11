import * as React from 'react';

import type {PageConstructorWrapper} from '../../common/types';
import RootCn from '../../components/RootCn';
import {BlockData, blockMap, navItemMap, subBlockMap} from '../../constructor-items';
import {BlockRegistryContext, useBlockRegistryProvider} from '../../context/blockRegistryContext';
import {BlocksContext} from '../../context/blocksContext';
import {InnerContext} from '../../context/innerContext';
import {Fields} from '../../form-generator-v2/types';
import {usePCEditorInitializeEvents} from '../../hooks/usePCEditorInitializeEvents';
import {usePCEditorStore} from '../../hooks/usePCEditorStore';
import {
    BlockWrapperDataProps,
    CustomConfig,
    CustomItems,
    PageContent,
    ShouldRenderBlock,
} from '../../models';
import {block as cnBlock, getCustomItems} from '../../utils';

import {ConstructorBlocks} from './components';
import {ConstructorRow} from './components/ConstructorRow';

import './PageConstructor.scss';

export interface PageConstructorExtension<
    GlobalConfig extends Object = {},
    WrapperProps extends Object = {},
    BlockWrapperProps extends Object = {},
> {
    name: string;
    id: string;
    settings: {
        ContentWrapper?: PageConstructorWrapper<WrapperProps>;
        contentWrapperProps?: WrapperProps;
        globalInputs?: Fields;
        globalDefaults?: GlobalConfig;
        blockWrapper?: React.ComponentType<
            BlockWrapperDataProps<BlockWrapperProps> & React.PropsWithChildren
        >;
        blockWrapperProps?: BlockWrapperProps;
        blockInputs?: Fields;
    };
}

const b = cnBlock('page-constructor');

export type ItemMap = typeof blockMap & typeof subBlockMap & CustomItems;

export type NavItemMap = typeof navItemMap & CustomItems;

export interface PageConstructorProps {
    content?: PageContent;
    shouldRenderBlock?: ShouldRenderBlock;
    custom?: CustomConfig;
    blocks?: Array<BlockData>;
    extensions?: Array<PageConstructorExtension>;
}

export const PageConstructor = (props: PageConstructorProps) => {
    const {
        content: initialContent = {blocks: []},
        shouldRenderBlock,
        custom,
        blocks: availableLocalBlocks = [],
        extensions: extensionsProp,
    } = props;

    const extensions = React.useMemo(() => extensionsProp ?? [], [extensionsProp]);

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

    const [content, setContent] = React.useState<PageContent>({
        ...globalDefaults,
        ...initialContent,
    });

    const store = usePCEditorStore();
    const {initialized} = store;

    const blockRegistry = useBlockRegistryProvider();

    const blockWrappers = React.useMemo(
        () =>
            extensions.flatMap((ext) =>
                ext.settings.blockWrapper
                    ? [
                          {
                              wrapper: ext.settings.blockWrapper,
                              props: ext.settings.blockWrapperProps ?? {},
                          },
                      ]
                    : [],
            ),
        [extensions],
    );

    const blockInputs = React.useMemo(
        () =>
            extensions.reduce<Fields>(
                (acc, ext) => [...acc, ...((ext.settings.blockInputs || []) as Fields)],
                [],
            ),
        [extensions],
    );

    usePCEditorInitializeEvents({
        initialContent: content,
        setContent,
        blocks: availableBlocks,
        global: extensions.reduce<Fields>(
            (acc, extension) => [...acc, ...((extension.settings.globalInputs || []) as Fields)],
            [],
        ),
        blockInputs,
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
            blockWrappers,
            content,
            setContent,
        }),
        [custom, shouldRenderBlock, availableBlocks, content, setContent, blockWrappers],
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
