import {useSearchParams} from 'react-router';

import EditorPage from './pages/editor/editor';
import PCPage from './pages/pc/pc';
import FormPage from './pages/form/form';

export default function Router() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    const id = searchParams.get('id');

    // Route based on query parameters
    switch (page) {
        case 'form':
            return <FormPage />;
        case 'pc':
            return <PCPage id={id} />;
        default:
            return <EditorPage />;
    }
}
