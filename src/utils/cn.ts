import {withNaming} from '@bem-react/classname';

import {UIKIT_ROOT_CLASS} from '../components/constants';

export const NAMESPACE = 'pc-';

export const cn = withNaming({e: '__', m: '_'});
export const block = withNaming({n: NAMESPACE, e: '__', m: '_'});
export const rootCn = cn(UIKIT_ROOT_CLASS);

export type CnBlock = ReturnType<typeof cn>;
