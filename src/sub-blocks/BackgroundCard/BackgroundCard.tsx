import React from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import {BackgroundImage, Buttons, CardBase, Links} from '../../components/';
import {useTheme} from '../../context/theme';
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
        urlTitle,
        controlPosition = 'content',
    } = props;

    const titleId = useUniqId();

    const theme = useTheme();
    const hasBackgroundColor = backgroundColor || cardTheme !== 'default';
    const borderType = hasBackgroundColor ? 'none' : border;
    const areControlsInFooter = !paddingBottom && controlPosition === 'footer';

    return (
        <CardBase
            className={b({padding: paddingBottom, theme: cardTheme})}
            url={url}
            border={borderType}
            analyticsEvents={analyticsEvents}
            urlTitle={urlTitle}
        >
            <CardBase.Content>
                <BackgroundImage
                    className={b('image')}
                    {...getThemedValue(background, theme)}
                    style={{backgroundColor}}
                />
                <Content
                    titleId={titleId}
                    title={title}
                    text={text}
                    additionalInfo={additionalInfo}
                    size="s"
                    theme={cardTheme}
                    links={areControlsInFooter ? undefined : links}
                    buttons={areControlsInFooter ? undefined : buttons}
                    colSizes={{all: 12, md: 12}}
                />
            </CardBase.Content>
            {areControlsInFooter && (links || buttons) && (
                <CardBase.Footer>
                    <Links className={b('links')} size="s" links={links} titleId={titleId} />
                    <Buttons
                        className={b('buttons')}
                        size="s"
                        buttons={buttons}
                        titleId={titleId}
                    />
                </CardBase.Footer>
            )}
        </CardBase>
    );
};

export default BackgroundCard;
