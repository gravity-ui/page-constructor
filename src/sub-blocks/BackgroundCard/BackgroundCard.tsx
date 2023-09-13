import React, {useContext} from 'react';

import {BackgroundImage, CardBase} from '../../components/';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {BackgroundCardProps} from '../../models';
import {block, getThemedValue} from '../../utils';
import Content from '../Content/Content';

import './BackgroundCard.scss';

const b = block('background-card');

const BackgroundCard = (props: BackgroundCardProps) => {
    const {
        url,
        title,
        text,
        border,
        background,
        paddingBottom,
        backgroundColor,
        additionalInfo,
        theme: cardTheme = 'default',
        links,
        buttons,
        analyticsEvents,
    } = props;

    const {themeValue: theme} = useContext(ThemeValueContext);
    const hasBackgroundColor = backgroundColor || cardTheme !== 'default';
    const borderType = hasBackgroundColor ? 'none' : border;

    return (
        <CardBase
            className={b({padding: paddingBottom, theme: cardTheme})}
            url={url}
            border={borderType}
            analyticsEvents={analyticsEvents}
        >
            <CardBase.Content>
                <BackgroundImage
                    className={b('image')}
                    {...getThemedValue(background, theme)}
                    style={{backgroundColor}}
                />
                <Content
                    title={title}
                    text={text}
                    additionalInfo={additionalInfo}
                    size="s"
                    theme={cardTheme}
                    links={links}
                    buttons={buttons}
                    colSizes={{all: 12, md: 12}}
                />
            </CardBase.Content>
        </CardBase>
    );
};

export default BackgroundCard;
