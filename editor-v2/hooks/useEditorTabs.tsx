import {useMemo} from 'react';

import Tabs, {TabsItemProps} from '../components/Tabs/Tabs';
import BlockConfig from '../containers/BlockConfig/BlockConfig';
import BlocksList from '../containers/BlocksList/BlocksList';
import GlobalConfig from '../containers/GlobalConfig/GlobalConfig';
import SourceCode from '../containers/SourceCode/SourceCode';
import Tree from '../containers/Tree/Tree';

export const useEditorTabs = ({
    leftTabs = [],
    rightTabs = [],
}: {
    leftTabs?: TabsItemProps[];
    rightTabs?: TabsItemProps[];
}) => {
    const tabs = useMemo(
        () => ({
            left: [
                {
                    id: 'page',
                    title: 'Page',
                    component: () => (
                        <Tabs
                            items={[
                                {
                                    id: 'blocks-list',
                                    title: 'Blocks',
                                    component: BlocksList,
                                },
                                {
                                    id: 'tree',
                                    title: 'Tree',
                                    component: Tree,
                                },
                                {
                                    id: 'source-code-yaml',
                                    title: 'YAML',
                                    component: () => <SourceCode format="yaml" />,
                                },
                                {
                                    id: 'source-code-json',
                                    title: 'JSON',
                                    component: () => <SourceCode format="json" />,
                                },
                            ]}
                        />
                    ),
                },
                {
                    id: 'global-config',
                    title: 'GlobalConfig',
                    component: GlobalConfig,
                },
                ...leftTabs,
            ],
            right: [
                {
                    id: 'block-config',
                    title: 'BlockConfig',
                    component: BlockConfig,
                    position: 'right',
                },
                {
                    id: 'source-code-yaml',
                    title: 'YAML',
                    component: () => <SourceCode format="yaml" />,
                },
                {
                    id: 'source-code-json',
                    title: 'JSON',
                    component: () => <SourceCode format="json" />,
                },
                ...rightTabs,
            ],
        }),
        [],
    );

    return tabs;
};
