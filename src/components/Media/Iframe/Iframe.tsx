import React from 'react';

import {MediaComponentIframeProps} from '../../../models';
import {block} from '../../../utils';

import i18n from './i18n';

import './Iframe.scss';

const b = block('media-component-iframe');

const Iframe = (props: MediaComponentIframeProps) => {
    const {iframe, margins = true} = props;
    const {height = 400} = iframe;

    return iframe ? (
        <div className={b({margins})} style={{height}}>
            <iframe
                className={b('item')}
                loading="lazy"
                title={i18n('iframe-title')}
                frameBorder={0}
                {...iframe}
            />
        </div>
    ) : null;
};

export default Iframe;
