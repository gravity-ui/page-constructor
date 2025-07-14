import * as React from 'react';

import Tabs, {TabItemProps} from '../components/Tabs/Tabs';
import BlockConfigForm from '../containers/BlockConfigForm/BlockConfigForm';
import BlocksList from '../containers/BlocksList/BlocksList';
import GlobalConfig from '../containers/GlobalConfig/GlobalConfig';
import SourceCode from '../containers/SourceCode/SourceCode';
import Tree from '../containers/Tree';

export const useEditorTabs = ({
    leftTabs,
    rightTabs,
}: {
    leftTabs?: TabItemProps[];
    rightTabs?: TabItemProps[];
}) => {
    const tabs = React.useMemo(
        () => ({
            left: [
                {
                    id: 'page',
                    title: 'PAGE',
                    component: () => (
                        <Tabs
                            items={[
                                {
                                    id: 'blocks-list',
                                    title: 'BLOCKS',
                                    component: BlocksList,
                                    withPadding: true,
                                },
                                {
                                    id: 'layers',
                                    title: 'LAYERS',
                                    component: Tree,
                                    withPadding: true,
                                },
                                {
                                    id: 'source-code',
                                    title: 'RAW',
                                    component: ({className}) => (
                                        <SourceCode className={className} />
                                    ),
                                    withPadding: true,
                                },
                            ]}
                        />
                    ),
                },
                {
                    id: 'global',
                    title: 'GLOBAL',
                    component: GlobalConfig,
                    withPadding: true,
                },
                ...(leftTabs || []),
            ],
            right: [
                {
                    id: 'edit',
                    title: 'EDIT',
                    component: () => (
                        <Tabs
                            items={[
                                {
                                    id: 'block-config',
                                    title: 'INPUTS',
                                    component: BlockConfigForm,
                                    withPadding: true,
                                },
                                {
                                    id: 'source-code',
                                    title: 'RAW',
                                    component: ({className}) => (
                                        <SourceCode
                                            className={className}
                                            showSelectedBlockOnly={true}
                                        />
                                    ),
                                    withPadding: true,
                                },
                            ]}
                        />
                    ),
                },
                ...(rightTabs || []),
            ],
        }),
        [leftTabs, rightTabs],
    );

    return tabs;
};
