import React from 'react';
import block from 'bem-cn-lite';

import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {BackgroundImage, Grid, getThemedValue} from '@yandex-data-ui/page-constructor';

import {HeaderBlockProps} from '../../models/blog';

import FullWidthBackground from '../FullWidthBackground/FullWidthBackground';
import {BlogFeedControls, BlogFeedControlsProps} from './components/Controls/Controls';

import './FeedHeader.scss';

const b = block('FeedHeader');

type HeaderProps = Pick<HeaderBlockProps, 'background' | 'offset' | 'theme' | 'verticalOffset'>;

type FeedHeaderProps = HeaderProps & BlogFeedControlsProps;

// TODO fix any in https://st.yandex-team.ru/ORION-1447
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FeedHeaderContainerProps = FeedHeaderProps & ClassNameProps & any;

export const FeedHeader: React.FC<FeedHeaderContainerProps> = ({
    tags,
    services,
    setIsFetching,
    offset = 'default',
    background,
    theme = 'default',
    verticalOffset = 'l',
    className,
}) => {
    const backgroundThemed = background && getThemedValue(background, theme);

    return (
        <header className={b('header', {['has-background']: Boolean(background)}, className)}>
            {backgroundThemed?.color ? (
                <FullWidthBackground
                    style={{backgroundColor: backgroundThemed?.color}}
                    theme="rounded"
                />
            ) : null}
            <Grid className={b('content', {offset, theme, 'vertical-offset': verticalOffset})}>
                {backgroundThemed ? (
                    <BackgroundImage
                        src={background.url}
                        className={b('background')}
                        imageClassName={b('background-img')}
                        style={{backgroundColor: background.fullWidth ? '' : background?.color}}
                        disableCompress={background?.disableCompress}
                    />
                ) : null}
                <BlogFeedControls tags={tags} services={services} setIsFetching={setIsFetching} />
            </Grid>
        </header>
    );
};
