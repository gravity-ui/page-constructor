import React, {useCallback} from 'react';

import {Author, Button, HTML, Image, YFMWrapper} from '../../components';
import {getMediaImage} from '../../components/Media/Image/utils';
import {useTheme} from '../../context/theme';
import {useAnalytics} from '../../hooks';
import {AuthorType, DefaultEventNames, QuoteProps, QuoteType} from '../../models';
import {block, getThemedValue} from '../../utils';

import './Quote.scss';

const b = block('quote');

const Quote = (props: QuoteProps) => {
    const {
        theme: textTheme = 'light',
        color,
        image,
        border = 'shadow',
        text,
        yfmText,
        logo,
        author,
        url,
        urlTitle,
        buttonText,
        quoteType = QuoteType.Chevron,
        button,
    } = props;
    const theme = useTheme();
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
                    theme={textTheme}
                />
            )}
            {url && buttonText && !button && (
                <Button
                    theme="outlined"
                    size="xl"
                    url={url}
                    className={b('link-button', {theme: textTheme})}
                    onClick={handleButtonClick}
                    urlTitle={urlTitle}
                    text={buttonText}
                />
            )}
            {button && <Button size="xl" {...button} />}
        </div>
    );

    const logoProps = getMediaImage(logo);

    return (
        <div
            className={b({theme: textTheme, border})}
            style={color ? {backgroundColor: color} : {}}
        >
            <div key={text} className={b('content-wrapper')}>
                <div>
                    <Image className={b('logo')} {...logoProps} />
                    <div className={b('content', {'quote-type': quoteType})}>
                        {text && (
                            <span className={b('text')}>
                                <HTML>{text}</HTML>
                            </span>
                        )}
                        {yfmText && (
                            <YFMWrapper
                                className={b('text')}
                                content={yfmText}
                                modifiers={{constructor: true}}
                            />
                        )}
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
