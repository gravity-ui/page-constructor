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
        case 'l':
            return 'm';
        case 's':
            return 's';
        default:
            return 'm';
    }
}

function getLinkSize(size: ContentSize) {
    switch (size) {
        case 'l':
            return 'l';
        case 's':
            return 'm';
        default:
            return 'l';
    }
}

function getButtonSize(size: ContentSize) {
    switch (size) {
        case 'l':
            return 'xl';
        case 's':
            return 'm';
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
        link,
        buttons,
        colSizes = {all: 12, sm: 8},
        centered,
        theme,
        className,
    } = props;

    const {text: titleText, ...titleProps} =
        !title || typeof title === 'string'
            ? ({text: title, textSize: getTextSize(size)} as TitleProps)
            : title;

    return (
        <Col className={b({size, centered, theme}, className)} reset sizes={colSizes}>
            {title && <Title className={b('title')} text={titleText} {...titleProps} resetMargin />}
            {text && (
                <div className={b('text')}>
                    <YFMWrapper content={text} modifiers={{constructor: true}} />
                </div>
            )}
            {additionalInfo && (
                <div className={b('notice')}>
                    <YFMWrapper content={additionalInfo} />
                </div>
            )}
            {link && <LinkBlock className={b('link')} {...link} textSize={getLinkSize(size)} />}
            <div className={b('buttons')}>
                {buttons &&
                    buttons.map((item) => (
                        <Button
                            className={b('button')}
                            {...item}
                            key={item.url}
                            size={getButtonSize(size)}
                        />
                    ))}
            </div>
        </Col>
    );
};

export default Content;
