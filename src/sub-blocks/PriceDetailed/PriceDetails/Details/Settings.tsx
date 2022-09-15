import React, {Fragment} from 'react';

import {block} from '../../../../utils';
import {PriceDetailsSettingsProps, TextSize} from '../../../../models';
import {YFMWrapper} from '../../../../components';

import './Settings.scss';

const b = block('settings-list');

export interface SettingsComponentProps {
    items: PriceDetailsSettingsProps[];
    titleSize?: TextSize;
    descriptionSize?: TextSize;
}

const Settings: React.FunctionComponent<SettingsComponentProps> = (props) => {
    const {items = [], titleSize = 's', descriptionSize = 'm'} = props;

    return (
        <Fragment>
            {items.map((item, id) => (
                <div key={id}>
                    <div className={b('title', {size: titleSize})}>{item.title}</div>
                    <div className={b('description', {size: descriptionSize})}>
                        <YFMWrapper content={item.description} modifiers={{constructor: true}} />
                    </div>
                </div>
            ))}
        </Fragment>
    );
};

export default Settings;
