import {Link} from '@gravity-ui/uikit';

import {useTheme} from '../../gravity-blocks/context/theme';
import {BrandIconDark} from '../../gravity-blocks/icons/BrandIconDark';
import {BrandIconLight} from '../../gravity-blocks/icons/BrandIconLight';
import {BrandName} from '../../gravity-blocks/icons/BrandName';
import type {ClassNameProps} from '../../models';
import {Theme} from '../../models';
import {block} from '../../utils';

import {i18n} from './i18n';

import './BrandFooter.scss';

const b = block('brand-footer');

const BrandFooter = ({className}: ClassNameProps) => {
    const theme = useTheme();

    return (
        <Link className={b({theme}, className)} href="https://gravity-ui.com">
            <div className={b('content')}>
                <span>{i18n('created-on')}</span>
                <div className={b('brand-icon')}>
                    {theme === Theme.Light ? <BrandIconLight /> : <BrandIconDark />}
                </div>
                <div className={b('brand-name')}>
                    <BrandName />
                </div>
            </div>
        </Link>
    );
};

export default BrandFooter;
