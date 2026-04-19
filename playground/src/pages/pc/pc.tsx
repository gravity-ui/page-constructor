import * as React from 'react';
// @gravity-ui/page-constructor
import {NavigationData, PageConstructor, PageConstructorProvider} from '../../../../src';
// @gravity-ui/page-constructor/blocks
import {blocks} from '../../../../src/blocks';
// Custom blocks
import CustomChildrenBlockConfig from '../../blocks/CustomChildrenBlock';
import CustomParentBlockConfig from '../../blocks/CustomParentBlock';
// Example 1
import contentExample1 from './example-1/content.json';
// Example 2
import contentExample2 from './example-2/content.json';
import navigationExample2 from './example-2/navigation.json';
import {GravityBlocksExtension, GravityBlocksProvider} from '../../../../src/blocks/settings';

const customBlocks = [...blocks, CustomParentBlockConfig, CustomChildrenBlockConfig];

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
            <GravityBlocksProvider projectSettings={{disableCompress: true}}>
                <PageConstructor
                    content={page.content}
                    extensions={GravityBlocksExtension({
                        globalDefaults: {
                            isBranded: true,
                            navigation: page.navigation,
                            animated: true,
                        },
                    })}
                />
            </GravityBlocksProvider>
        </PageConstructorProvider>
    );
}
