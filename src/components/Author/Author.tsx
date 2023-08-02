import React from 'react';

import {AuthorProps, AuthorType, WithChildren} from '../../models';
import {block} from '../../utils';
import {Image} from '../index';

import './Author.scss';

const b = block('author');

const Author = (props: WithChildren<AuthorProps>) => {
    const {author, className, authorContainerClassName, type = AuthorType.Column, qa} = props;
    const {firstName, secondName, description, avatar} = author;

    const name = secondName ? `${firstName} ${secondName}` : firstName;

    return (
        <div className={b({type}, className)} data-qa={qa}>
            {avatar && (
                <div className={b('avatar', authorContainerClassName)}>
                    {typeof avatar === 'string' ? <Image src={avatar} /> : avatar}
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
