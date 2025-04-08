import * as React from 'react';

import {Image, Title} from '../../components';
import {LocationContext} from '../../context/locationContext';
import {useTheme} from '../../context/theme';
import {Grid} from '../../grid';
import {useAnalytics} from '../../hooks';
import {IconsBlockItemProps, IconsBlockProps} from '../../models';
import {block, getLinkProps, getThemedValue} from '../../utils';

import './Icons.scss';

const b = block('icons-block');

const getItemContent = (item: IconsBlockProps['items'][number] & {src: string}) => (
    <React.Fragment>
        <Image className={b('image')} src={item.src} />
        <p className={b('text')}>{item.text}</p>
    </React.Fragment>
);

const Icons = ({title, description, size = 's', colSizes = {all: 12}, items}: IconsBlockProps) => {
    const {hostname} = React.useContext(LocationContext);
    const handleAnalytics = useAnalytics();
    const theme = useTheme();

    const onClick = React.useCallback(
        ({analyticsEvents, url}: IconsBlockItemProps) => {
            handleAnalytics(analyticsEvents, {url});
        },
        [handleAnalytics],
    );

    return (
        <Grid>
            <div className={b({size})}>
                {(title || description) && (
                    <Title
                        className={b('header')}
                        title={title}
                        subtitle={description}
                        colSizes={colSizes}
                    />
                )}
                {items &&
                    items.map((item) => {
                        const themedSrc = getThemedValue(item.src, theme);
                        const itemContent = getItemContent({...item, src: themedSrc});
                        const {url, text} = item;
                        return url ? (
                            <a
                                className={b('item')}
                                key={url}
                                href={url}
                                aria-label={text}
                                title={text}
                                {...getLinkProps(url, hostname)}
                                onClick={() => onClick(item)}
                            >
                                {itemContent}
                            </a>
                        ) : (
                            <div className={b('item')} key={text}>
                                {itemContent}
                            </div>
                        );
                    })}
            </div>
        </Grid>
    );
};

export default Icons;
