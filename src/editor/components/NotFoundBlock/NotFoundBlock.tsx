import * as React from 'react';

import {BlockBase} from '../../../components';
import {BlockDecorationProps} from '../../../models';
import {block} from '../../../utils';

import {i18n} from './i18n';

import './NotFoundBlock.scss';

const b = block('not-found-block');

export const NotFoundBlock = ({type, children}: BlockDecorationProps) =>
    children ? (
        <React.Fragment>{children}</React.Fragment>
    ) : (
        <BlockBase>
            <div className={b()}>{i18n('message', {type})}</div>
        </BlockBase>
    );
