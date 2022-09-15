import React, {forwardRef, Fragment, useContext, useEffect, useState} from 'react';

import {block, getThemedValue} from '../../../utils';
import {Col, GridColumnSize} from '../../../grid';
import {PreviewItemProps, PreviewRatioMediaContent, Refable} from '../../../models';
import {YFMWrapper, HTML} from '../../../components/';
import PreviewContent from './PreviewContent';
import PreviewMedia from './PreviewMedia';
import {ThemeValueContext} from '../../../context/theme/ThemeValueContext';

import './MediaContent.scss';

const b = block('preview-media-content-block');

interface MediaContentProps extends Refable<HTMLDivElement> {
    items: PreviewItemProps[];
    title: string;
    description?: string;
    ratioMediaContent?: PreviewRatioMediaContent;
    switching: boolean;
    isActiveBlock: (id: number, isMediaBlock?: boolean) => boolean;
    showMediaContent: (id: number) => void;
}

const MediaContent: React.FC<MediaContentProps> = forwardRef<HTMLDivElement, MediaContentProps>(
    (props, ref) => {
        const {
            items,
            title,
            description = '',
            switching,
            ratioMediaContent = '1-1',
            isActiveBlock,
            showMediaContent,
        } = props;

        const {themeValue: theme} = useContext(ThemeValueContext);
        const [mediaSizes, setMediaSizes] = useState({[GridColumnSize.All]: 12});
        const [contentSizes, setContentSizes] = useState({[GridColumnSize.All]: 12});

        useEffect(() => {
            const [mediaSize, contentSize] = ratioMediaContent.split('-');
            const blockSize = 12 / (Number(mediaSize) + Number(contentSize));

            const updatedMediaSizes = {
                ...mediaSizes,
                [GridColumnSize.Md]: blockSize * Number(mediaSize),
            };
            setMediaSizes(updatedMediaSizes);

            const updatedContentSizes = {
                ...contentSizes,
                [GridColumnSize.Md]: blockSize * Number(contentSize),
            };
            setContentSizes(updatedContentSizes);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ratioMediaContent]);

        const contentComponents: JSX.Element[] = [];
        const mediaComponents: JSX.Element[] = [];

        items.forEach((item: PreviewItemProps, id: number) => {
            const {content, media} = item;
            const isActive = isActiveBlock(id);
            const contentMods = {active: isActive};
            const mediaMods = {active: isActiveBlock(id, true)};
            const onClick = () => showMediaContent(id);

            contentComponents.push(
                <PreviewContent
                    key={id}
                    id={id}
                    {...content}
                    switching={switching}
                    onClick={onClick}
                    mods={contentMods}
                />,
            );
            mediaComponents.push(
                <PreviewMedia
                    key={id}
                    id={id}
                    media={media && getThemedValue(media, theme)}
                    play={isActive}
                    mods={mediaMods}
                />,
            );
        });

        return (
            <Fragment>
                <Col sizes={contentSizes} className={b('content')}>
                    <div className={b('header')}>
                        <h2 className={b('title')}>
                            <HTML>{title}</HTML>
                        </h2>
                        {description && (
                            <div className={b('description')}>
                                <YFMWrapper content={description} modifiers={{constructor: true}} />
                            </div>
                        )}
                    </div>
                    <Col ref={ref} className={b('menu')}>
                        <div className={b('content-wrapper')}>{contentComponents}</div>
                    </Col>
                </Col>
                <Col sizes={mediaSizes} className={b('media')}>
                    {mediaComponents}
                </Col>
            </Fragment>
        );
    },
);

MediaContent.displayName = 'MediaContent';

export default MediaContent;
