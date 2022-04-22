import React from 'react';

import {block} from '../../utils';
import {ContentBlockProps, ContentSize, TitleProps} from '../../models';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {Title, YFMWrapper, Button} from '../index';
import LinkBlock from '../Link/Link';
import {Col} from '../../grid';

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

const Content: React.FC<ContentBlockProps & ClassNameProps> = (props) => {
    const {
        title,
        text,
        additionalInfo,
        size = 'l',
        links,
        buttons,
        colSizes = {all: 12, sm: 8},
        centered,
        theme,
        className,
    } = props;

    const {...titleProps} =
        !title || typeof title === 'string'
            ? ({text: title, textSize: getTextSize(size)} as TitleProps)
            : title;

    const hasTitle = Boolean(title);

    return (
        <Col className={b({size, centered, theme}, className)} reset sizes={colSizes}>
            {title && <Title className={b('title')} {...titleProps} resetMargin />}
            {text && (
                <div className={b('text', {['without-title']: !hasTitle})}>
                    <YFMWrapper content={text} modifiers={{constructor: true}} />
                </div>
            )}
            {additionalInfo && (
                <div className={b('notice')}>
                    <YFMWrapper content={additionalInfo} modifiers={{constructor: true}} />
                </div>
            )}
            {links && (
                <div className={b('links')}>
                    {links.map((link) => (
                        <LinkBlock
                            className={b('link')}
                            {...link}
                            textSize={getLinkSize(size)}
                            key={link.url}
                        />
                    ))}
                </div>
            )}
            {buttons && (
                <div className={b('buttons')}>
                    {buttons.map((item) => (
                        <Button
                            className={b('button')}
                            {...item}
                            key={item.url}
                            size={getButtonSize(size)}
                        />
                    ))}
                </div>
            )}
        </Col>
    );
};

export default Content;
