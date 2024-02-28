import React, {useMemo} from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import {BackgroundImage, CardBase} from '../../components/';
import {useTheme} from '../../context/theme';
import {BackgroundCardProps} from '../../models';
import {block, getThemedValue} from '../../utils';
import renderContentControls from '../../utils/renderContentControls/renderContentControls';
import Content from '../Content/Content';
import renderCardFooterControlsContainer from '../renderCardFooterControlsContainer/renderCardFooterControlsContainer';

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

    const footerControls = useMemo(
        () =>
            renderContentControls(
                {
                    links: areControlsInFooter ? links : undefined,
                    buttons: areControlsInFooter ? buttons : undefined,
                    size: 's',
                    titleId,
                },
                renderCardFooterControlsContainer,
            ),
        [areControlsInFooter, links, buttons, titleId],
    );

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
            {footerControls}
        </CardBase>
    );
};

export default BackgroundCard;
