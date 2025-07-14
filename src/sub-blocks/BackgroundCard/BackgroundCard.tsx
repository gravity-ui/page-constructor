import {useUniqId} from '@gravity-ui/uikit';

import {BackgroundImage, CardBase} from '../../components/';
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
        list,
        size = 's',
    } = props;

    const titleId = useUniqId();

    const theme = useTheme();
    const hasBackgroundColor = backgroundColor || cardTheme !== 'default';
    const borderType = hasBackgroundColor ? 'none' : border;
    const areControlsInFooter = !paddingBottom && controlPosition === 'footer';

    return (
        <CardBase
            className={b({padding: paddingBottom, theme: cardTheme})}
            contentClassName={b('content')}
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
                    size={size}
                    theme={cardTheme}
                    links={links}
                    buttons={buttons}
                    list={list}
                    colSizes={{all: 12, md: 12}}
                    controlPosition={areControlsInFooter ? 'bottom' : 'default'}
                />
            </CardBase.Content>
        </CardBase>
    );
};

export default BackgroundCard;
