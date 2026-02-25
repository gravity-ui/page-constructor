import {Flex, Link, Text} from '@gravity-ui/uikit';

import {Image} from '../../../../components';
import {useTheme} from '../../../../context/theme';
import {Col} from '../../../../grid';
import type {FooterBlockProps, FooterContactItem} from '../../../../models';
import {block, getThemedValue} from '../../../../utils';
import {useLogoImageProps} from '../../hooks/useLogoImageProps';

import './SocialFloor.scss';

const b = block('footer-block');

type SocialFloorProps = {
    contacts: NonNullable<FooterBlockProps['contacts']>;
};

type SocialIconsProps = {
    links: SocialFloorProps['contacts']['links'];
    theme: ReturnType<typeof useTheme>;
};

type SocialIconItemProps = {
    contact: FooterContactItem;
    theme: ReturnType<typeof useTheme>;
};

const SocialIconItem = ({contact, theme}: SocialIconItemProps) => {
    const iconResolved = contact.icon && getThemedValue(contact.icon, theme);
    const iconProps = useLogoImageProps(iconResolved);

    if (!iconProps) {
        return null;
    }

    return (
        <li className={b('social-icons-item')}>
            <Link
                className={b('social-icon-link')}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Flex direction="column" alignItems="center" gap={2}>
                    <Image
                        {...iconProps}
                        alt={contact.urlTitle ?? ''}
                        className={b('social-icon-item')}
                    />
                    {contact.urlTitle && <Text variant="body-2">{contact.urlTitle}</Text>}
                </Flex>
            </Link>
        </li>
    );
};

const SocialIcons = ({links, theme}: SocialIconsProps) => {
    if (!links?.length) return null;

    return (
        <ul className={b('social-icons-list')}>
            {links.map((contact, index) => (
                <SocialIconItem key={index} contact={contact} theme={theme} />
            ))}
        </ul>
    );
};

export const SocialFloor = ({contacts}: SocialFloorProps) => {
    const theme = useTheme();

    if (!contacts.links?.length) {
        return null;
    }

    return (
        <Col sizes={{all: 12}} className={b('floor', {social: true})}>
            <div
                className={b('social-floor-inner', {
                    'title-position': contacts.titlePosition || 'top',
                    'links-position': contacts.linksPosition || 'left',
                    size: contacts.iconsSize ?? 'l',
                })}
            >
                {contacts.title && <h3 className={b('social-floor-title')}>{contacts.title}</h3>}
                <SocialIcons links={contacts.links} theme={theme} />
            </div>
        </Col>
    );
};
