import React from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import {Button, ContentList, Link as LinkBlock, Title, YFMWrapper} from '../../components';
import {Col} from '../../grid';
import {ClassNameProps, ContentBlockProps, ContentSize, TitleItemProps} from '../../models';
import {QAProps} from '../../models/common';
import {block} from '../../utils';
import {getQaAttrubutes} from '../../utils/blocks';

import './Content.scss';

const b = block('content');

function getTextSize(size: ContentSize) {
    switch (size) {
        case 's':
            return 's';
        case 'l':
        default:
            return 'm';
    }
}

function getLinkSize(size: ContentSize) {
    switch (size) {
        case 's':
            return 'm';
        case 'l':
        default:
            return 'l';
    }
}

function getButtonSize(size: ContentSize) {
    switch (size) {
        case 's':
            return 'm';
        case 'l':
        default:
            return 'xl';
    }
}

export type ContentProps = ContentBlockProps &
    ClassNameProps &
    QAProps & {
        titleClassName?: string;
        textClassName?: string;
        listClassName?: string;
        linksClassName?: string;
        buttonsClassName?: string;
    };

const Content = (props: ContentProps) => {
    const {
        title,
        titleId: titleIdFromProps,
        titleClassName,
        text,
        textId,
        textClassName,
        additionalInfo,
        size = 'l',
        links,
        linksClassName,
        buttons,
        buttonsClassName,
        colSizes = {all: 12, sm: 8},
        centered,
        theme,
        className,
        list,
        listClassName,
        qa,
    } = props;
    const qaAttributes = getQaAttrubutes(qa, ['links', 'link', 'buttons', 'button', 'list']);

    const titleProps =
        !title || typeof title === 'string'
            ? ({text: title, textSize: getTextSize(size)} as TitleItemProps)
            : title;

    const hasTitle = Boolean(title);
    const defaultTitleId = useUniqId();
    const titleId = titleIdFromProps || defaultTitleId;

    return (
        <Col
            className={b({size, centered, theme}, className)}
            reset
            sizes={colSizes}
            qa={qaAttributes.container}
        >
            {title && (
                <Title
                    className={b('title', null, titleClassName)}
                    title={titleProps}
                    colSizes={{all: 12}}
                    id={titleId}
                />
            )}
            {text && (
                <div className={b('text', {['without-title']: !hasTitle}, textClassName)}>
                    <YFMWrapper
                        content={text}
                        modifiers={{constructor: true, [`constructor-size-${size}`]: true}}
                        id={textId}
                    />
                </div>
            )}
            {list?.length ? (
                <div className={b('list', null, listClassName)}>
                    <ContentList list={list} size={size} qa={qaAttributes.list} />
                </div>
            ) : null}
            {additionalInfo && (
                <div className={b('notice')}>
                    <YFMWrapper
                        content={additionalInfo}
                        modifiers={{
                            constructor: true,
                            'constructor-notice': true,
                            [`constructor-size-${size}`]: true,
                        }}
                    />
                </div>
            )}
            {links && (
                <div className={b('links', null, linksClassName)} data-qa={qaAttributes.links}>
                    {links.map((link) => (
                        <LinkBlock
                            className={b('link')}
                            {...link}
                            textSize={getLinkSize(size)}
                            key={link.url}
                            qa={qaAttributes.link}
                            extraProps={{
                                'aria-describedby': link.urlTitle ? undefined : titleId,
                                ...link.extraProps,
                            }}
                        />
                    ))}
                </div>
            )}
            {buttons && (
                <div
                    className={b('buttons', null, buttonsClassName)}
                    data-qa={qaAttributes.buttons}
                >
                    {buttons.map((item) => (
                        <Button
                            className={b('button')}
                            {...item}
                            key={item.url}
                            size={getButtonSize(size)}
                            qa={qaAttributes.button}
                            extraProps={{
                                'aria-describedby': item.urlTitle ? undefined : titleId,
                                ...item.extraProps,
                            }}
                        />
                    ))}
                </div>
            )}
        </Col>
    );
};

export default Content;
