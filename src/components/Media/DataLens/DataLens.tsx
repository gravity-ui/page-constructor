import React from 'react';

import {MediaComponentDataLensProps, ReactFCC} from '../../../models';
import {block} from '../../../utils';
import {unifyDataLensToObject} from './utils';

import './DataLens.scss';

const b = block('media-component-data-lens');

const DataLens: ReactFCC<MediaComponentDataLensProps> = (props) => {
    const {dataLens} = props;
    const dataLensData = unifyDataLensToObject(dataLens);

    return dataLens ? (
        <div className={b('wrap')}>
            <iframe
                src={`https://datalens.yandex/${dataLensData.id}?_embedded=1&_theme=${dataLensData.theme}`}
                className={b('iframe')}
                frameBorder={0}
            />
        </div>
    ) : null;
};

export default DataLens;
