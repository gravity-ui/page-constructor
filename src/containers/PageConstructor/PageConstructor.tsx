import * as React from 'react';

import '@diplodoc/transform/dist/js/yfm';
import {ThemeProvider} from '@gravity-ui/uikit';

import BackgroundMedia from '../../components/BackgroundMedia/BackgroundMedia';
import BrandFooter from '../../components/BrandFooter/BrandFooter';
import RootCn from '../../components/RootCn';
import {blockMap, navItemMap, subBlockMap} from '../../constructor-items';
import {AnimateContext} from '../../context/animateContext';
import {InnerContext} from '../../context/innerContext';
import {ProjectSettingsContext} from '../../context/projectSettingsContext';
import {useTheme} from '../../context/theme';
import {usePCEditorInitializeEvents} from '../../hooks/usePCEditorInitializeEvents';
import {usePCEditorStore} from '../../hooks/usePCEditorStore';
import {
    BlockTypes,
    CustomConfig,
    CustomItems,
    HeaderBlockTypes,
    NavigationData,
    NavigationItemTypes,
    PageContent,
    PageContentWithNavigation,
    ShouldRenderBlock,
    SubBlockTypes,
} from '../../models';
import Layout from '../../navigation/containers/Layout/Layout';
import {block as cnBlock, getCustomItems, getCustomTypes, getThemedValue} from '../../utils';

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
    renderMenu?: () => React.ReactNode;
    navigation?: NavigationData;
    isBranded?: boolean;
    microdata?: {
        contentUpdatedDate?: string;
    };
}

export const Constructor = (props: PageConstructorProps) => {
    const {
        content: {blocks = [], background} = {},
        renderMenu,
        shouldRenderBlock,
        navigation,
        custom,
        isBranded,
        microdata,
    } = props;

    const [content, setContent] = React.useState<PageContentWithNavigation>({
        blocks,
        background,
        navigation,
    });

    const theme = useTheme();

    const store = usePCEditorStore();
    const {initialized, isPreviewMode} = store;

    usePCEditorInitializeEvents({initialContent: {blocks, background, navigation}, setContent});

    const {context} = React.useMemo(
        () => ({
            context: {
                blockTypes: [...BlockTypes, ...getCustomTypes(['blocks', 'headers'], custom)],
                subBlockTypes: [...SubBlockTypes, ...getCustomTypes(['subBlocks'], custom)],
                headerBlockTypes: [...HeaderBlockTypes, ...getCustomTypes(['headers'], custom)],
                navigationBlockTypes: [
                    ...NavigationItemTypes,
                    ...getCustomTypes(['navigation'], custom),
                ],
                itemMap: {
                    ...blockMap,
                    ...subBlockMap,
                    ...getCustomItems(['blocks', 'headers', 'subBlocks'], custom),
                },
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
            },
        }),
        [custom, shouldRenderBlock, microdata],
    );

    const restBlocks = content.blocks;
    const themedBackground = getThemedValue(content.background, theme);

    // disable click events
    React.useEffect(() => {
        if (initialized && !isPreviewMode) {
            const handler: React.EventHandler<any> = (e) => {
                e?.preventDefault();
                const blockElement = e.target.closest('[data-editor-item]');
                blockElement.click(e);
            };
            document.body.addEventListener('click', handler);
            return () => {
                document.body.removeEventListener('click', handler);
            };
        }
    }, [initialized, isPreviewMode]);

    return (
        <InnerContext.Provider value={context}>
            <RootCn className={b('', {['with-editor']: initialized})}>
                <div className={b('wrapper')}>
                    {themedBackground && (
                        <BackgroundMedia {...themedBackground} className={b('background')} />
                    )}
                    <Layout navigation={content.navigation}>
                        {renderMenu && renderMenu()}
                        {restBlocks && (
                            <ConstructorRow>
                                <ConstructorBlocks items={restBlocks} />
                            </ConstructorRow>
                        )}
                    </Layout>
                    {isBranded && <BrandFooter />}
                </div>
            </RootCn>
        </InnerContext.Provider>
    );
};

export const PageConstructor = (props: PageConstructorProps) => {
    const {isAnimationEnabled = true} = React.useContext(ProjectSettingsContext);
    const {content: {animated = isAnimationEnabled} = {}, ...rest} = props;

    return (
        <ThemeProvider>
            <AnimateContext.Provider value={{animated}}>
                <Constructor content={props.content} {...rest} />
            </AnimateContext.Provider>
        </ThemeProvider>
    );
};
