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
        theme = 'default',
        links,
        buttons,
    } = props;

    const hasBackgroundColor = backgroundColor || theme !== 'default';
    const link = hasBackgroundColor || border === 'line' ? undefined : url;
    const borderType = hasBackgroundColor ? 'none' : border;

    return (
        <CardBase className={b({padding: paddingBottom, theme})} url={link} border={borderType}>
            <CardBase.Content>
                <BackgroundImage className={b('image')} {...background} style={{backgroundColor}} />
                <Content
                    title={title}
                    text={text}
                    additionalInfo={additionalInfo}
                    size="s"
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
