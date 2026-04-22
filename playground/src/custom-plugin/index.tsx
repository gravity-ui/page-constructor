import React from 'react';

import {PageContent} from '../../../src/models';
import type {PageConstructorWrapperProps} from '../../../src/common/types';
import type {PageConstructorExtension} from '../../../src/containers/PageConstructor/PageConstructor';
import type {BlockWrapperDataProps} from '../../../src/models';
import {Fields} from '../../../src/form-generator-v2/types';
import {ThemeProvider} from '@gravity-ui/uikit';
import {
    Bell,
    Flag,
    Gear,
    Globe,
    Heart,
    House,
    Layers,
    Magnifier,
    Person,
    PlanetEarth,
    Star,
} from '@gravity-ui/icons';
import type {IconData} from '@gravity-ui/uikit';
import {AsideHeader} from '@gravity-ui/navigation';
import type {MenuItem, SubheaderMenuItem} from '@gravity-ui/navigation';
import {useContent} from '../../../src';

const ICON_MAP: Record<string, IconData> = {
    House,
    Gear,
    Person,
    Bell,
    Flag,
    Star,
    Globe,
    Layers,
    Magnifier,
    Heart,
};

const ICON_OPTIONS = Object.keys(ICON_MAP).map((value) => ({value, content: value}));

const PADDING_MAP: Record<string, number> = {
    '0': 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
};

interface PaddingConfig {
    all?: string;
    vertical?: string;
    horizontal?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

function resolvePadding(p: PaddingConfig | undefined) {
    if (!p) return {};
    const get = (side: string, axis: string) =>
        PADDING_MAP[
            p[side as keyof PaddingConfig] ?? p[axis as keyof PaddingConfig] ?? p.all ?? ''
        ] ?? 0;
    return {
        paddingTop: get('top', 'vertical'),
        paddingRight: get('right', 'horizontal'),
        paddingBottom: get('bottom', 'vertical'),
        paddingLeft: get('left', 'horizontal'),
    };
}

interface ExperementalBlocksWrapperProps {}

interface ExperementalBlocksGlobalConfig {
    logo?: {
        text?: string;
        href?: string;
        iconSrc?: string;
    };
    headerDecoration?: boolean;
    hideCollapseButton?: boolean;
    collapseTitle?: string;
    expandTitle?: string;
    menuItems?: {
        id: string;
        title: string;
        link?: string;
        type?: string;
        icon?: string;
        pinned?: boolean;
    }[];
    subheaderItems?: {
        id: string;
        title: string;
        icon?: string;
    }[];
}

export interface ExperementalPageContent extends PageContent, ExperementalBlocksGlobalConfig {}

export const ExperementalBlocksContentWrapper: React.FC<
    ExperementalBlocksWrapperProps & PageConstructorWrapperProps
> = ({children}) => {
    const {content} = useContent<ExperementalPageContent>();
    const {
        menuItems,
        subheaderItems,
        headerDecoration,
        hideCollapseButton,
        collapseTitle,
        expandTitle,
    } = content;

    const [compact, setCompact] = React.useState(true);

    const resolvedMenuItems: MenuItem[] = (menuItems ?? []).map((item) => ({
        id: item.id || '',
        title: item.title || '',
        link: item.link,
        icon: item.icon ? ICON_MAP[item.icon] : Flag,
        pinned: item.pinned,
        type: (item.type as MenuItem['type']) ?? 'regular',
    }));

    const resolvedSubheaderItems: SubheaderMenuItem[] = (subheaderItems ?? []).map((item) => ({
        item: {
            id: item.id || '',
            title: item.title || '',
            icon: item.icon ? ICON_MAP[item.icon] : Flag,
        },
    }));

    return (
        <React.Fragment>
            <div style={{width: '100%', maxHeight: '3000px'}}>
                <ThemeProvider>
                    <AsideHeader
                        logo={{text: 'Logo', icon: PlanetEarth}}
                        menuItems={resolvedMenuItems}
                        subheaderItems={resolvedSubheaderItems}
                        compact={compact}
                        onChangeCompact={setCompact}
                        headerDecoration={headerDecoration}
                        hideCollapseButton={hideCollapseButton}
                        collapseTitle={collapseTitle}
                        expandTitle={expandTitle}
                        renderContent={() => <div>{children}</div>}
                    />
                </ThemeProvider>
            </div>
        </React.Fragment>
    );
};

export const ExperementalBlockWrapper: React.FC<
    BlockWrapperDataProps<ExperementalBlocksWrapperProps> & React.PropsWithChildren
> = ({content, children}) => {
    const padding = resolvePadding((content as unknown as {padding?: PaddingConfig}).padding);
    return <div style={padding}>{children}</div>;
};

export const ExperementalBlocksExtension = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: ExperementalBlocksWrapperProps;
    globalDefaults?: ExperementalBlocksGlobalConfig;
} = {}): PageConstructorExtension<
    ExperementalBlocksGlobalConfig,
    ExperementalBlocksWrapperProps
> => {
    return {
        name: 'Experemental Blocks Extension',
        id: '@Experemental-ui/page-constructor/Experemental-blocks-extension',
        settings: {
            ContentWrapper: ExperementalBlocksContentWrapper,
            contentWrapperProps: wrapperProps,
            blockWrapper: ExperementalBlockWrapper,
            blockInputs: [
                {
                    type: 'section',
                    title: 'Padding',
                    fields: [
                        {
                            type: 'segmentedRadioGroup',
                            name: '_paddingMode',
                            title: 'Mode',
                            options: [
                                {value: 'all', content: 'All'},
                                {value: 'axes', content: 'Axes'},
                                {value: 'individual', content: 'Individual'},
                            ],
                        },
                        {
                            type: 'select',
                            name: 'padding.all',
                            title: 'All sides',
                            hasClear: true,
                            options: ['0', 'xs', 's', 'm', 'l', 'xl'].map((v) => ({
                                value: v,
                                content: v.toUpperCase(),
                            })),
                            when: [{field: '_paddingMode', operator: '===', value: 'all'}],
                        },
                        {
                            type: 'select',
                            name: 'padding.vertical',
                            title: 'Vertical (top / bottom)',
                            hasClear: true,
                            options: ['0', 'xs', 's', 'm', 'l', 'xl'].map((v) => ({
                                value: v,
                                content: v.toUpperCase(),
                            })),
                            when: [{field: '_paddingMode', operator: '===', value: 'axes'}],
                        },
                        {
                            type: 'select',
                            name: 'padding.horizontal',
                            title: 'Horizontal (left / right)',
                            hasClear: true,
                            options: ['0', 'xs', 's', 'm', 'l', 'xl'].map((v) => ({
                                value: v,
                                content: v.toUpperCase(),
                            })),
                            when: [{field: '_paddingMode', operator: '===', value: 'axes'}],
                        },
                        {
                            type: 'select',
                            name: 'padding.top',
                            title: 'Top',
                            hasClear: true,
                            options: ['0', 'xs', 's', 'm', 'l', 'xl'].map((v) => ({
                                value: v,
                                content: v.toUpperCase(),
                            })),
                            when: [{field: '_paddingMode', operator: '===', value: 'individual'}],
                        },
                        {
                            type: 'select',
                            name: 'padding.right',
                            title: 'Right',
                            hasClear: true,
                            options: ['0', 'xs', 's', 'm', 'l', 'xl'].map((v) => ({
                                value: v,
                                content: v.toUpperCase(),
                            })),
                            when: [{field: '_paddingMode', operator: '===', value: 'individual'}],
                        },
                        {
                            type: 'select',
                            name: 'padding.bottom',
                            title: 'Bottom',
                            hasClear: true,
                            options: ['0', 'xs', 's', 'm', 'l', 'xl'].map((v) => ({
                                value: v,
                                content: v.toUpperCase(),
                            })),
                            when: [{field: '_paddingMode', operator: '===', value: 'individual'}],
                        },
                        {
                            type: 'select',
                            name: 'padding.left',
                            title: 'Left',
                            hasClear: true,
                            options: ['0', 'xs', 's', 'm', 'l', 'xl'].map((v) => ({
                                value: v,
                                content: v.toUpperCase(),
                            })),
                            when: [{field: '_paddingMode', operator: '===', value: 'individual'}],
                        },
                    ],
                },
            ] as Fields,
            globalInputs: [
                {
                    type: 'section',
                    title: 'Header Settings',
                    fields: [
                        {type: 'switch', name: 'headerDecoration', title: 'Header decoration'},
                        {type: 'switch', name: 'hideCollapseButton', title: 'Hide collapse button'},
                        {
                            type: 'textInput',
                            name: 'collapseTitle',
                            title: 'Collapse button tooltip',
                        },
                        {type: 'textInput', name: 'expandTitle', title: 'Expand button tooltip'},
                    ],
                },
                {
                    type: 'section',
                    title: 'Menu Items',
                    withAddButton: true,
                    index: 'index',
                    itemTitle: 'Item {{index}}',
                    itemView: 'card',
                    fields: [
                        {type: 'textInput', name: 'menuItems[{{index}}].id', title: 'ID'},
                        {type: 'textInput', name: 'menuItems[{{index}}].title', title: 'Title'},
                        {type: 'textInput', name: 'menuItems[{{index}}].link', title: 'Link URL'},
                        {
                            type: 'select',
                            name: 'menuItems[{{index}}].type',
                            title: 'Type',
                            hasClear: true,
                            options: [
                                {value: 'regular', content: 'Regular'},
                                {value: 'action', content: 'Action'},
                                {value: 'divider', content: 'Divider'},
                            ],
                        },
                        {
                            type: 'select',
                            name: 'menuItems[{{index}}].icon',
                            title: 'Icon',
                            hasClear: true,
                            options: ICON_OPTIONS,
                        },
                        {type: 'switch', name: 'menuItems[{{index}}].pinned', title: 'Pinned'},
                    ],
                },
                {
                    type: 'section',
                    title: 'Subheader Items',
                    withAddButton: true,
                    index: 'index2',
                    itemTitle: 'Subheader Item {{index2}}',
                    itemView: 'card',
                    fields: [
                        {type: 'textInput', name: 'subheaderItems[{{index2}}].id', title: 'ID'},
                        {
                            type: 'textInput',
                            name: 'subheaderItems[{{index2}}].title',
                            title: 'Title',
                        },
                        {
                            type: 'select',
                            name: 'subheaderItems[{{index2}}].icon',
                            title: 'Icon',
                            hasClear: true,
                            options: ICON_OPTIONS,
                        },
                    ],
                },
            ] as Fields,
            globalDefaults,
        },
    };
};
