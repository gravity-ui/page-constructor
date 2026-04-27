import {useSearchParams} from 'react-router';

import EditorPage from './pages/editor/editor';
import ExperimentalPage from './pages/experemental/experemental';
import PCPage from './pages/pc/pc';

export default function Router() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    const id = searchParams.get('id');

    switch (page) {
        case 'gravity-blocks':
            return <PCPage id={id} />;
        case 'experemental':
            return <ExperimentalPage id={id} />;
        default:
            return <EditorPage />;
    }
}
