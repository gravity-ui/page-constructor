import {useSearchParams} from 'react-router';

import EditorPage from './pages/editor/editor';
import PCPage from './pages/pc/pc';
import FormPage from './pages/form/form';
import ExperimentalPage from './pages/experemental/experemental';

export default function Router() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    const id = searchParams.get('id');

    switch (page) {
        case 'form':
            return <FormPage />;
        case 'pc':
            return <PCPage id={id} />;
        case 'experemental':
            return <ExperimentalPage id={id} />;
        default:
            return <EditorPage />;
    }
}
