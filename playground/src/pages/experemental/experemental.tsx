import * as React from 'react';
// @gravity-ui/page-constructor
import {NavigationData, PageConstructor, PageConstructorProvider} from '../../../../src';
// @gravity-ui/page-constructor/blocks
import {blocks} from '../../../../src/blocks';
// Custom blocks
import CustomChildrenBlockConfig from '../../blocks/CustomChildrenBlock';
import CustomParentBlockConfig from '../../blocks/CustomParentBlock';
import DefinitionListBlockConfig from '../../blocks/DefinitionListBlock';
// Example 1
import contentExample1 from './example-1/content.json';
// Example 2
import contentExample2 from './example-2/content.json';
import navigationExample2 from './example-2/navigation.json';
import {ExperementalBlocksExtension} from '../../custom-plugin';

const customBlocks = [CustomParentBlockConfig, CustomChildrenBlockConfig, DefinitionListBlockConfig];

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

    console.log(page);

    return (
        <PageConstructorProvider blocks={customBlocks}>
            <PageConstructor content={page.content} extensions={[ExperementalBlocksExtension()]} />
        </PageConstructorProvider>
    );
}
