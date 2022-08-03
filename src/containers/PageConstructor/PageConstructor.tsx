import React, {Fragment, ReactElement, useContext, useMemo} from 'react';
import _ from 'lodash';

import {
    Block,
    ShouldRenderBlock,
    HeaderBlockTypes,
    CustomConfig,
    LoadableConfigItem,
    PageContent,
    CustomComponents,
    BlockTypes,
    ConstructorItem as ConstructorItemType,
} from '../../models';
import {blockMap, subBlockMap} from '../../constructor-items';
import Loadable, {LoadableComponentsProps} from '../Loadable/Loadable';
import {Col, Grid, Row} from '../../grid';
import BlockBase from '../../components/BlockBase/BlockBase';
import BackgroundMedia from '../../components/BackgroundMedia/BackgroundMedia';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import {
    getItemKey,
    getCustomBlockTypes,
    getCustomHeaderTypes,
    getCustomComponents,
    block as cnBlock,
    getThemedValue,
} from '../../utils';
import {withThemeValue, WithThemeValueProps} from '../../context/theme/withThemeValue';
import {AnimateContext} from '../../context/animateContext';

import './PageConstructor.scss';
import '../../../styles/yfm.scss';
import {InnerContext} from '../../context/innerContext';

const b = cnBlock('page-constructor');

export interface PageConstructorProps {
    content?: PageContent;
    shouldRenderBlock?: ShouldRenderBlock;
    custom?: CustomConfig;
    renderMenu?: () => React.ReactNode;
}

type Props = PageConstructorProps & WithThemeValueProps;

export type ItemMap = typeof blockMap & typeof subBlockMap & CustomComponents;

export const ConstructorRow: React.FC<{}> = ({children}) =>
    children ? (
        <Row className={b('row')}>
            <Col className={b('col')}>{children}</Col>
        </Row>
    ) : null;

export const ConstructorFootnotes: React.FC<{items: string[]}> = ({items}) => (
    <ol className={b('footnotes')}>
        {items.map((footnote, index) => (
            <li className={b('footnotes-item')} key={index}>
                <YFMWrapper
                    content={footnote}
                    modifiers={{
                        constructor: true,
                        constructorFootnotePage: true,
                    }}
                />
            </li>
        ))}
    </ol>
);

interface ConstructorLoadableProps
    extends Omit<LoadableComponentsProps, 'Component' | 'ChildComponent' | 'fetch'> {
    config: LoadableConfigItem;
}

export const ConstructorLoadable: React.FC<ConstructorLoadableProps> = (props) => {
    const {itemMap} = useContext(InnerContext);
    const {block, blockKey, config, serviceId, params} = props;
    const {type} = block;
    const {fetch, component: ChildComponent} = config;
    const Component = itemMap[type] as React.ComponentType<
        React.ComponentProps<typeof itemMap[typeof type]>
    >;

    return (
        <Loadable
            key={blockKey}
            block={block}
            blockKey={blockKey}
            Component={Component}
            ChildComponent={ChildComponent}
            fetch={fetch}
            serviceId={serviceId}
            params={params}
        />
    );
};

interface ConstructorBlockProps {
    data: Block;
    key: string;
    Component: ReactElement;
    shouldRenderBlock?: ShouldRenderBlock;
}

export const ConstructorBlock: React.FC<ConstructorBlockProps> = ({
    data,
    key,
    Component,
    shouldRenderBlock,
}) => {
    const {anchor, visible} = data;

    if (!shouldRenderBlock?.(data, key)) {
        return null;
    }

    return (
        <BlockBase
            className={b('block', {type: data.type})}
            key={key}
            anchor={anchor}
            visible={visible}
            resetPaddings={data.resetPaddings}
        >
            {Component}
        </BlockBase>
    );
};

interface ConstructorItemProps {
    data: ConstructorItemType;
    key: string;
}

export const ConstructorItem: React.FC<ConstructorItemProps> = ({data, key, children}) => {
    const {itemMap} = useContext(InnerContext);
    const {type, ...rest} = data;

    const Component = itemMap[type] as React.ComponentType<
        React.ComponentProps<typeof itemMap[typeof type]>
    >;

    return (
        <Component key={key} {...rest}>
            {children}
        </Component>
    );
};
interface ConstructorBlocksProps {
    items: ConstructorItemType[];
}

export const ConstructorBlocks: React.FC<ConstructorBlocksProps> = ({items}) => {
    const {blockTypes, customLoadable, itemMap} = useContext(InnerContext);

    const renderer = (item: ConstructorItemType, index: number): ReactElement | null => {
        if (!itemMap[item.type]) {
            return null;
        }

        let children;
        let itemElement;
        const itemKey = getItemKey(item, index);

        if ('loadable' in item && item.loadable) {
            const {source, serviceId, params} = item.loadable;
            const config: LoadableConfigItem = _.get(customLoadable, source);
            if (!config) {
                return null;
            }

            itemElement = (
                <ConstructorLoadable
                    block={item}
                    blockKey={itemKey}
                    config={config}
                    serviceId={serviceId}
                    params={params}
                />
            );
        } else {
            if ('children' in item && item.children) {
                children = item.children.map(renderer);
            }

            itemElement = (
                <ConstructorItem data={item} key={itemKey}>
                    {children}
                </ConstructorItem>
            );
        }

        return blockTypes.includes(item.type) ? (
            <ConstructorBlock data={item as Block} key={itemKey} Component={itemElement} />
        ) : (
            itemElement
        );
    };

    return <Fragment>{items.map(renderer)}</Fragment>;
};

export const ConstructorHeader: React.FC<Pick<ConstructorItemProps, 'data'>> = ({data}) => (
    <ConstructorItem data={data} key={data.type} />
);

export const Constructor: React.FC<Props> = (props) => {
    const {blockTypes, fullHeaderBlockTypes, itemMap} = useMemo(
        () => ({
            blockTypes: [...BlockTypes, ...getCustomBlockTypes(props.custom)],
            fullHeaderBlockTypes: [...HeaderBlockTypes, ...getCustomHeaderTypes(props.custom)],
            itemMap: {
                ...blockMap,
                ...subBlockMap,
                ...getCustomComponents(props.custom),
            },
        }),
        [props.custom],
    );

    const {
        content: {blocks = [], background = {}, footnotes = []} = {},
        renderMenu,
        themeValue: theme,
    } = props;

    const hasFootnotes = footnotes.length > 0;
    const isHeaderBlock = (block: Block) => fullHeaderBlockTypes.includes(block.type);
    const header = blocks?.find(isHeaderBlock);
    const restBlocks = blocks?.filter((block) => !isHeaderBlock(block));
    const themedBackground = getThemedValue(background, theme);

    return (
        <InnerContext.Provider value={{itemMap: itemMap, blockTypes: blockTypes}}>
            <div className={b({'has-footnotes': hasFootnotes})}>
                <div className={b('wrapper')}>
                    <BackgroundMedia {...themedBackground} className={b('background')} />
                    {renderMenu?.()}
                    {header && <ConstructorHeader data={header} />}
                    <Grid className={b('grid')}>
                        {restBlocks && (
                            <ConstructorRow>
                                <ConstructorBlocks items={restBlocks} />
                            </ConstructorRow>
                        )}
                        {hasFootnotes && (
                            <ConstructorRow>
                                <ConstructorFootnotes items={footnotes} />
                            </ConstructorRow>
                        )}
                    </Grid>
                </div>
            </div>
        </InnerContext.Provider>
    );
};

const ThemedConstructor = withThemeValue(Constructor);

export const PageConstructor: React.FC<PageConstructorProps> = (props) => {
    const {content: {animated = true} = {}, ...rest} = props;

    return (
        <AnimateContext.Provider value={{animated}}>
            <ThemedConstructor content={props.content} {...rest} />
        </AnimateContext.Provider>
    );
};
