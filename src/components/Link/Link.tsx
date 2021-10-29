import React, {useCallback, useContext} from 'react';
import block from 'bem-cn-lite';

import {Icon} from '@yandex-data-ui/common';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {LinkProps} from '../../models';
// import chevron from 'assets/icons/navigation-chevron.svg';
import chevron from '../../../assets/icons/navigation-chevron.svg';
import FileLink from '../FileLink/FileLink';
import BackLink from '../BackLink/BackLink';
import {getLinkProps, setUrlTld} from '../../utils';
import {LocaleContext} from '../../context/localeContext/localeContext';
import {LocationContext} from '../../context/locationContext/locationContext';

import './Link.scss';

const b = block('link-block');

type LinkFullProps = LinkProps & ClassNameProps;

const LinkBlock: React.FunctionComponent<LinkFullProps> = (props) => {
    const {
        text,
        url,
        arrow,
        theme = 'file-link',
        colorTheme = 'light',
        textSize = 'm',
        className,
        children,
    } = props;

    const {hostname} = useContext(LocationContext);
    const {tld} = useContext(LocaleContext);
    const href = setUrlTld(props.url, tld);
    const defaultTextSize = theme === 'back' ? 'l' : 'm';

    const getLinkByType = useCallback(() => {
        switch (theme) {
            case 'back':
                return <BackLink title={children || text} url={href} />;
            case 'file-link':
            case 'underline':
                return (
                    <FileLink
                        text={children || text}
                        href={href}
                        type="horizontal"
                        textSize={textSize}
                    />
                );
            case 'normal':
                return (
                    <a
                        className={b('link', {theme: colorTheme, 'has-arrow': arrow})}
                        href={href}
                        {...getLinkProps(url, hostname)}
                    >
                        {children || text}
                        {arrow && <Icon className={b('arrow')} data={chevron} />}
                    </a>
                );
            default:
                return null;
        }
    }, [arrow, children, colorTheme, href, hostname, text, textSize, theme, url]);

    return (
        <div className={b({size: textSize || defaultTextSize}, className)}>{getLinkByType()}</div>
    );
};

export default LinkBlock;
