import * as React from 'react';

import '@diplodoc/transform/dist/js/yfm';

import RootCn from '../../components/RootCn';
import {BlockData, blockMap, navItemMap, subBlockMap} from '../../constructor-items';
import {InnerContext} from '../../context/innerContext';
import {usePCEditorInitializeEvents} from '../../hooks/usePCEditorInitializeEvents';
import {usePCEditorStore} from '../../hooks/usePCEditorStore';
import {CustomConfig, CustomItems, PageContent, ShouldRenderBlock} from '../../models';
import type {PageConstructorWrapper} from '../../common/types';
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
import {BlocksContext} from '../../context/blocksContext';
import {ConfigInput} from '../../form-generator';
import EmptyBlocksWrapper from '../../components/editor/EmptyBlocksWrapper/EmptyBlocksWrapper';
import {Fields} from '../../form-generator-v2/types';

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
    const {initialized, isPreviewMode} = store;

    usePCEditorInitializeEvents({
        initialContent: content,
        setContent,
        blocks: availableBlocks,
        global: extensions.reduce<Fields>(
            (acc, extension) => [...acc, ...((extension.settings.globalInputs || []) as Fields)],
            [],
        ),
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

    // disable click events (WTF? why we need this?)
    React.useEffect(() => {
        if (!initialized || isPreviewMode) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler: React.EventHandler<any> = (e) => {
            e?.preventDefault();
            const blockElement = e.target.closest('[data-editor-item]');
            blockElement.click(e);
        };
        document.body.addEventListener('click', handler);

        // eslint-disable-next-line consistent-return
        return () => {
            document.body.removeEventListener('click', handler);
        };
    }, [initialized, isPreviewMode]);

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
        <InnerContext.Provider value={context}>
            <RootCn className={b('', {['with-editor']: initialized})}>{wrappedContent}</RootCn>
        </InnerContext.Provider>
    );
};
