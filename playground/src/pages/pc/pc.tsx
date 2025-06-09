import * as React from 'react';
import {NavigationData, PageConstructor, PageConstructorProvider} from '../../../../src';

// Example 1
import contentExample1 from './example-1/content.json';

// Example 2
import contentExample2 from './example-2/content.json';
import navigationExample2 from './example-2/navigation.json';

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
                    navigation: navigationExample2,
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
        <PageConstructorProvider projectSettings={{disableCompress: true}}>
            <PageConstructor
                content={page.content}
                navigation={page.navigation as NavigationData}
            />
        </PageConstructorProvider>
    );
}
