import React from 'react';

import {block} from '../../utils';
import {CardBase, Image, HTML} from '../../components';
import {ImageProps, PartnerProps} from '../../models';

import './Partner.scss';

const b = block('partner-block');

const Partner = ({text, logo, url, border}: PartnerProps) => {
    const logoData: ImageProps = typeof logo === 'string' ? {src: logo} : logo;

    return (
        <CardBase url={url} target="_blank" className={b()} border={border}>
            <CardBase.Content>
                <Image className={b('logo')} src={logoData.src} alt={logoData.alt} />
                <HTML>{text}</HTML>
            </CardBase.Content>
        </CardBase>
    );
};

export default Partner;
