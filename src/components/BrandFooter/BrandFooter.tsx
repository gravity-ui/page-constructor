import React from 'react';

import {Link} from '@gravity-ui/uikit';

import {BrandIcon} from '../../icons/BrandIcon';
import {BrandName} from '../../icons/BrandName';
import type {ClassNameProps} from '../../models';
import {block} from '../../utils';

import {i18n} from './i18n';

import './BrandFooter.scss';

const b = block('brand-footer');

const BrandFooter = ({className}: ClassNameProps) => (
    <Link className={b(null, className)} href="https://gravity-ui.com">
        <div className={b('content')}>
            <span className={b('text')}>{i18n('created-on')}</span>
            <div className={b('brand-icon')}>
                <BrandIcon />
            </div>
            <div className={b('brand-name')}>
                <BrandName />
            </div>
        </div>
    </Link>
);

export default BrandFooter;
