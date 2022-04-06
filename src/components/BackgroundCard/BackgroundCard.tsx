import React from 'react';

import {block} from '../../utils';
import CardBase from '../../components/CardBase/CardBase';
import {BackgroundCardProps} from '../../models';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import Content from '../Content/Content';

import './BackgroundCard.scss';

const b = block('background-card');

const BackgroundCard: React.FC<BackgroundCardProps> = (props) => {
    const {
        url,
        title,
        text,
        border,
        background,
        paddingBottom,
        backgroundColor,
        additionalInfo,
        size = 's',
        theme = 'default',
        links,
        buttons,
    } = props;

    const link = backgroundColor || theme !== 'default' ? undefined : url;
    const isBorderNone = backgroundColor || theme !== 'default';

    return (
        <CardBase
            className={b({padding: paddingBottom, theme, border: isBorderNone && 'none'})}
            url={link}
            border={border}
            backgroundColor={backgroundColor}
        >
            <CardBase.Content>
                <BackgroundImage className={b('image')} {...background} />
                <Content
                    title={title}
                    text={text}
                    additionalInfo={additionalInfo}
                    size={size}
                    theme={theme}
                    links={links}
                    buttons={buttons}
                    colSizes={{all: 12, md: 12}}
                />
            </CardBase.Content>
        </CardBase>
    );
};

export default BackgroundCard;
