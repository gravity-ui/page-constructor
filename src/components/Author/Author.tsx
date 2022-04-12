import React from 'react';

import {Image} from '../index';
import {AuthorProps, AuthorType} from '../../models';
import {block} from '../../utils';

import './Author.scss';

const b = block('author');

const Author: React.FC<AuthorProps> = (props) => {
    const {author, className, type = AuthorType.Column} = props;
    const {firstName, secondName, description, avatar} = author;

    const name = secondName ? `${firstName} ${secondName}` : firstName;

    return (
        <div className={b({type}, className)}>
            {avatar && (
                <div className={b('avatar')}>
                    {typeof avatar === 'string' ? <Image src={avatar} /> : avatar}
                </div>
            )}
            <div className={b('label')}>
                <div className={b('name')}>{name}</div>
                {description || ''}
            </div>
        </div>
    );
};
export default Author;
