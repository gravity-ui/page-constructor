import React from 'react';

import {CardBase, HTML, Image} from '../../components';
import {ImageProps, PartnerProps} from '../../models';
import {block} from '../../utils';

import './Partner.scss';

const b = block('partner-block');

const Partner = ({text, logo, url, border}: PartnerProps) => {
    const logoData: ImageProps = typeof logo === 'string' ? {src: logo} : logo;

    return (
        <CardBase url={url} target="_blank" className={b()} border={border}>
            <CardBase.Content>
                <Image className={b('logo')} {...logoData} />
                <HTML>{text}</HTML>
            </CardBase.Content>
        </CardBase>
    );
};

export default Partner;
