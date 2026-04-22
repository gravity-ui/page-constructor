import * as React from 'react';
// @gravity-ui/page-constructor
import {NavigationData, PageConstructor, PageConstructorProvider} from '../../../../src';
// Custom blocks — atoms
import AccordionBlockConfig from '../../blocks/AccordionBlock';
import AlertBlockConfig from '../../blocks/AlertBlock';
import AvatarBlockConfig from '../../blocks/AvatarBlock';
import BreadcrumbsBlockConfig from '../../blocks/BreadcrumbsBlock';
import ButtonBlockConfig from '../../blocks/ButtonBlock';
import LabelBlockConfig from '../../blocks/LabelBlock';
import ProgressBlockConfig from '../../blocks/ProgressBlock';
import TabsAtomBlockConfig from '../../blocks/TabsAtomBlock';
import UserBlockConfig from '../../blocks/UserBlock';
// Custom blocks — containers
import CardContainerConfig from '../../blocks/CardContainer';
import ColumnsContainerConfig from '../../blocks/ColumnsContainer';
import SectionContainerConfig from '../../blocks/SectionContainer';
import DefinitionListBlockConfig from '../../blocks/DefinitionListBlock';
// Example 1
import contentExample1 from './example-1/content.json';
// Example 2
import contentExample2 from './example-2/content.json';
import navigationExample2 from './example-2/navigation.json';
import {ExperementalBlocksExtension} from '../../custom-plugin';

const customBlocks = [
    // Atoms
    ButtonBlockConfig,
    AlertBlockConfig,
    LabelBlockConfig,
    ProgressBlockConfig,
    AccordionBlockConfig,
    TabsAtomBlockConfig,
    UserBlockConfig,
    BreadcrumbsBlockConfig,
    AvatarBlockConfig,
    DefinitionListBlockConfig,
    // Containers
    ColumnsContainerConfig,
    CardContainerConfig,
    SectionContainerConfig,
];

interface PCPageProps {
    id?: string | null;
}

export default function PCPage({id}: PCPageProps) {
    const pageId = id || '1';

    const page = React.useMemo(() => {
        switch (Number(pageId)) {
            case 2:
                import('./example-2/styles.scss');
                return {
                    content: contentExample2,
                    navigation: navigationExample2 as NavigationData,
                };
            default:
            case 1:
                return {
                    content: contentExample1,
                    navigation: undefined,
                };
        }
    }, [pageId]);

    return (
        <PageConstructorProvider blocks={customBlocks}>
            <PageConstructor content={page.content} extensions={[ExperementalBlocksExtension()]} />
        </PageConstructorProvider>
    );
}
