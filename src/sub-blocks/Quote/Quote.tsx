import React, {useCallback, useContext} from 'react';
import {Button} from '@gravity-ui/uikit';

import {block, getThemedValue} from '../../utils';
import {QuoteProps, AuthorType, DefaultEventNames} from '../../models';

import {Author, Image, HTML, RouterLink} from '../../components';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {getMediaImage} from '../../components/Media/Image/utils';
import {useAnalytics} from '../../hooks';

import './Quote.scss';

const b = block('quote');

const Quote = (props: QuoteProps) => {
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
    const imageData = getMediaImage(imageThemed);
    const handleAnalytics = useAnalytics(DefaultEventNames.QuoteButton, url);

    const handleButtonClick = useCallback(() => handleAnalytics(), [handleAnalytics]);

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
                    component={RouterLink}
                    className={b('link-button', {theme: textTheme})}
                    onClick={handleButtonClick}
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
                <Image {...imageData} className={b('image')} />
            </div>
        </div>
    );
};

export default Quote;
