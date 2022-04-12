import React, {useContext} from 'react';
import {Button} from '@yandex-data-ui/common';
import {HTML} from '@doc-tools/components';

import {block, getThemedValue} from '../../utils';
import {QuoteProps, AuthorType, ImageObjectProps} from '../../models';

import Author from '../Author/Author';
import Image from '../Image/Image';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';

import './Quote.scss';

const b = block('quote');

const Quote: React.FunctionComponent<QuoteProps> = (props) => {
    const {
        theme: textTheme = 'light',
        color,
        image,
        border = 'shadow',
        text,
        logo,
        author,
        url,
        buttonText,
    } = props;
    const {themeValue: theme} = useContext(ThemeValueContext);
    const imageThemed = getThemedValue(image, theme);
    const imageData: ImageObjectProps =
        typeof imageThemed === 'string' ? {src: imageThemed} : imageThemed;

    const renderFooter = Boolean(author || url) && (
        <div className={b('author-wrapper')}>
            {author && (
                <Author
                    className={b('author', {theme: textTheme})}
                    author={author}
                    type={AuthorType.Line}
                />
            )}
            {url && buttonText && (
                <Button
                    view="outlined"
                    size="xl"
                    href={url}
                    className={b('link-button', {theme: textTheme})}
                >
                    {buttonText}
                </Button>
            )}
        </div>
    );

    return (
        <div
            className={b({theme: textTheme, border})}
            style={color ? {backgroundColor: color} : {}}
        >
            <div key={text} className={b('content-wrapper')}>
                <div>
                    <Image className={b('logo')} src={logo} />
                    <div className={b('content')}>
                        <span className={b('text')}>
                            <HTML>{text}</HTML>
                        </span>
                    </div>
                </div>
                {renderFooter}
            </div>
            <div className={b('image-wrapper')}>
                <Image src={imageData.src} alt={imageData.alt} className={b('image')} />
            </div>
        </div>
    );
};

export default Quote;
