import * as React from 'react';

import {TabItemProps} from '../components/Tabs/Tabs';
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
                    id: 'global',
                    title: 'GLOBAL',
                    component: GlobalConfig,
                    withPadding: true,
                },
                {
                    id: 'source-code',
                    title: 'RAW',
                    component: SourceCode,
                    withPadding: true,
                },
                ...(leftTabs || []),
            ],
            right: [
                {
                    id: 'block-config',
                    title: 'INPUTS',
                    component: BlockConfigForm,
                },
                {
                    id: 'source-code',
                    title: 'RAW',
                    component: ({className}: {className?: string}) => (
                        <SourceCode className={className} showSelectedBlockOnly={true} />
                    ),
                    withPadding: true,
                },
                ...(rightTabs || []),
            ],
        }),
        [leftTabs, rightTabs],
    );

    return tabs;
};
