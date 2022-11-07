import React, {useContext} from 'react';
import {Icon} from '@gravity-ui/uikit';

import {block, getLinkProps, setUrlTld} from '../../utils';
import {LinkProps, TextSize, ClassNameProps, WithChildren} from '../../models';
import {Chevron} from '../../icons';
import FileLink from '../FileLink/FileLink';
import BackLink from '../BackLink/BackLink';
import {LocaleContext} from '../../context/localeContext/localeContext';
import {LocationContext} from '../../context/locationContext/locationContext';
import {useMetrika} from '../../hooks/useMetrika';

import './Link.scss';

const b = block('link-block');

export type LinkFullProps = LinkProps & ClassNameProps;

function getArrowSize(size: TextSize) {
    switch (size) {
        case 'l':
            return 20;
        case 'm':
            return 18;
        case 's':
            return 12;
        default:
            return 12;
    }
}

const LinkBlock = (props: WithChildren<LinkFullProps>) => {
    const {
        text,
        url,
        arrow,
        metrikaGoals,
        pixelEvents,
        theme = 'file-link',
        colorTheme = 'light',
        textSize = 'm',
        className,
        target,
        children,
    } = props;

    const handleMetrika = useMetrika();
    const {hostname} = useContext(LocationContext);
    const {tld} = useContext(LocaleContext);
    const href = setUrlTld(props.url, tld);
    const defaultTextSize = theme === 'back' ? 'l' : 'm';

    const onClick = () => {
        handleMetrika({metrikaGoals, pixelEvents});
    };

    const getLinkByType = () => {
        switch (theme) {
            case 'back':
                return <BackLink title={children || text} url={href} onClick={onClick} />;
            case 'file-link':
            case 'underline':
                return (
                    <FileLink
                        text={children || text}
                        href={href}
                        type="horizontal"
                        textSize={textSize}
                        onClick={onClick}
                    />
                );
            case 'normal': {
                const linkProps = getLinkProps(url, hostname, target);

                return (
                    <a
                        className={b('link', {theme: colorTheme, 'has-arrow': arrow})}
                        href={href}
                        onClick={onClick}
                        {...linkProps}
                    >
                        {children || text}
                        {arrow && (
                            <Icon
                                className={b('arrow')}
                                data={Chevron}
                                size={getArrowSize(textSize)}
                            />
                        )}
                    </a>
                );
            }
            default:
                return null;
        }
    };

    return (
        <div className={b({size: textSize || defaultTextSize}, className)}>{getLinkByType()}</div>
    );
};

export default LinkBlock;
