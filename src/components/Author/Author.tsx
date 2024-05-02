import React from 'react';

import {AuthorProps, AuthorType, ImageProps, WithChildren} from '../../models';
import {block} from '../../utils';
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

    const name = secondName ? `${firstName} ${secondName}` : firstName;
    const isAvatarJSX = React.isValidElement(avatar);
    let avatarProps = {};
    if (!isAvatarJSX && avatar) {
        avatarProps = getMediaImage(avatar as ImageProps);
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
