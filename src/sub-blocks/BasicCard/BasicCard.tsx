import React from 'react';

import {block} from '../../utils';
import CardBase from '../../components/CardBase/CardBase';
import {BasicCardProps} from '../../models';
import Image from '../../components/Image/Image';
import {Content} from '../';
import {getMediaImage} from '../../components/Media/Image/utils';

import './BasicCard.scss';

const b = block('basic-card');

const BasicCard = (props: BasicCardProps) => {
    const {title, text, icon, additionalInfo, links, buttons, ...cardParams} = props;
    const iconProps = icon && getMediaImage(icon);

    return (
        <CardBase className={b()} {...cardParams}>
            <CardBase.Content>
                {iconProps && <Image {...iconProps} className={b('icon')} />}
                <Content
                    title={title}
                    text={text}
                    additionalInfo={additionalInfo}
                    links={links}
                    buttons={buttons}
                    colSizes={{all: 12, md: 12}}
                    size="s"
                />
            </CardBase.Content>
        </CardBase>
    );
};

export default BasicCard;
