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
                    title: 'PAGE',
                    component: () => (
                        <Tabs
                            items={[
                                {
                                    id: 'blocks-list',
                                    title: 'BLOCKS',
                                    component: BlocksList,
                                },
                                {
                                    id: 'layers',
                                    title: 'LAYERS',
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
                    id: 'navigation',
                    title: 'NAVIGATION',
                    component: GlobalConfig,
                },
                ...leftTabs,
            ],
            right: [
                {
                    id: 'block-config',
                    title: 'INPUTS',
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
