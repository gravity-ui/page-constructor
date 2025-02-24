import * as React from 'react';

import '@diplodoc/transform/dist/js/yfm.js';

import BackgroundMedia from '../../components/BackgroundMedia/BackgroundMedia';
import BrandFooter from '../../components/BrandFooter/BrandFooter';
import RootCn from '../../components/RootCn';
import {blockMap, navItemMap, subBlockMap} from '../../constructor-items';
import {AnimateContext} from '../../context/animateContext';
import {InnerContext} from '../../context/innerContext';
import {ProjectSettingsContext} from '../../context/projectSettingsContext';
import {useTheme} from '../../context/theme';
import {Grid} from '../../grid';
import {
    BlockType,
    BlockTypes,
    CustomConfig,
    CustomItems,
    HeaderBlockTypes,
    NavigationData,
    NavigationItemTypes,
    PageContent,
    ShouldRenderBlock,
    SubBlockTypes,
} from '../../models';
import Layout from '../../navigation/containers/Layout/Layout';
import {
    block as cnBlock,
    getCustomItems,
    getCustomTypes,
    getHeaderBlock,
    getOrderedBlocks,
    getThemedValue,
} from '../../utils';

import {ConstructorBlocks} from './components/ConstructorBlocks';
import {ConstructorHeader} from './components/ConstructorItem';
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

    const theme = useTheme();

    const header = getHeaderBlock(blocks, context.headerBlockTypes);
    const restBlocks = getOrderedBlocks(blocks, context.headerBlockTypes);
    const themedBackground = getThemedValue(background, theme);

    return (
        <InnerContext.Provider value={context}>
            <RootCn className={b()}>
                <div className={b('wrapper')}>
                    {themedBackground && (
                        <BackgroundMedia {...themedBackground} className={b('background')} />
                    )}
                    <Layout navigation={navigation}>
                        {renderMenu && renderMenu()}
                        {header && (
                            <ConstructorHeader data={header} blockKey={BlockType.HeaderBlock} />
                        )}
                        <Grid>
                            {restBlocks && (
                                <ConstructorRow>
                                    <ConstructorBlocks items={restBlocks} />
                                </ConstructorRow>
                            )}
                        </Grid>
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
        <AnimateContext.Provider value={{animated}}>
            <Constructor content={props.content} {...rest} />
        </AnimateContext.Provider>
    );
};
