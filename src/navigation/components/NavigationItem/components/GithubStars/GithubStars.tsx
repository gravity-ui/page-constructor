import React from 'react';
import GitHubButton from 'react-github-btn';

import {block} from '../../../../../utils';

import {NavigationItemProps} from '../../NavigationItem';
import {NavigationGithubButton} from '../../../../../models';

import './GithubStars.scss';

const b = block('github-stars');

type NavigationGithubButtonProps = NavigationItemProps & NavigationGithubButton;

export const GithubStars = ({text, url, className, label}: NavigationGithubButtonProps) => (
    <div className={b(null, className)}>
        <GitHubButton href={url} data-show-count="true" aria-label={label || 'Stars on GitHub'}>
            {text}
        </GitHubButton>
    </div>
);
