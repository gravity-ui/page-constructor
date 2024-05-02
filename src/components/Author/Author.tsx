import React from 'react';

import {useTheme} from '../../context/theme';
import {AuthorProps, AuthorType, ImageProps, WithChildren} from '../../models';
import {block, getThemedValue} from '../../utils';
import {getMediaImage} from '../Media/Image/utils';
import {Image} from '../index';

import './Author.scss';

const b = block('author');

const Author = (props: WithChildren<AuthorProps>) => {
    const {
        author,
        className,
        authorContainerClassName,
        type = AuthorType.Column,
        qa,
        theme,
    } = props;
    const {firstName, secondName, description, avatar} = author;
    const globalTheme = useTheme();

    const name = secondName ? `${firstName} ${secondName}` : firstName;
    const isAvatarJSX = React.isValidElement(avatar);
    let avatarProps = {};
    if (!isAvatarJSX && avatar) {
        const themedAvatar = getThemedValue(avatar, globalTheme);
        avatarProps = getMediaImage(themedAvatar as ImageProps);
    }

    return (
        <div className={b({type, theme}, className)} data-qa={qa}>
            {avatar && (
                <div className={b('avatar', authorContainerClassName)}>
                    {isAvatarJSX ? avatar : <Image {...avatarProps} />}
                </div>
            )}
            <div className={b('label')}>
                <div className={b('name')}>{name}</div>
                {description && <div className={b('description')}>{description}</div>}
            </div>
        </div>
    );
};
export default Author;
