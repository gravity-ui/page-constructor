import React from 'react';

import {MediaComponentDataLensProps} from '../../../models';
import {block} from '../../../utils';
import i18n from './i18n';
import {unifyDataLensToObject} from './utils';

import './DataLens.scss';

const b = block('media-component-data-lens');

const DataLens = (props: MediaComponentDataLensProps) => {
    const {dataLens} = props;
    const dataLensData = unifyDataLensToObject(dataLens);

    return dataLens ? (
        <div className={b('wrap')}>
            <iframe
                src={`https://datalens.yandex/${dataLensData.id}?_embedded=1&_theme=${dataLensData.theme}`}
                className={b('iframe')}
                loading="lazy"
                title={i18n('iframe-title')}
                frameBorder={0}
            />
        </div>
    ) : null;
};

export default DataLens;
