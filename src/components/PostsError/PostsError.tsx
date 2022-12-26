import React from 'react';

import {Button} from '@gravity-ui/uikit';

import {i18, Keyset} from '../../i18n';

import {block} from '../../utils/cn';

import './PostError.scss';

const b = block('posts-error');

type PostsErrorContainerProps = {
    onButtonClick?: () => void | Promise<void>;
};

export const PostsError: React.FC<PostsErrorContainerProps> = ({onButtonClick}) => {
    const handleClick = () => (onButtonClick ? onButtonClick() : window.location.reload());

    return (
        <div className={b('container')}>
            <div className={b('title')}>{i18(Keyset.ErrorTitle)}</div>
            <div className={b('subtitle')}>{i18(Keyset.PostLoadError)}</div>
            <div className={b('button')}>
                <Button size="xl" view="outlined" onClick={handleClick}>
                    {i18(Keyset.ActionTryAgain)}
                </Button>
            </div>
        </div>
    );
};
