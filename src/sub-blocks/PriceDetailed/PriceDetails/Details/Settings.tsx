import React, {Fragment} from 'react';

import {YFMWrapper} from '../../../../components';
import {PriceDetailsSettingsProps, TextSize} from '../../../../models';
import {block} from '../../../../utils';

import './Settings.scss';

const b = block('settings-list');

export interface SettingsComponentProps {
    items: PriceDetailsSettingsProps[];
    titleSize?: TextSize;
    descriptionSize?: TextSize;
}

const Settings = (props: SettingsComponentProps) => {
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
