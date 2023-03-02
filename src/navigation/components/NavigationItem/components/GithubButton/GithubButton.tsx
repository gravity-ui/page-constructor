import React, {useRef, useEffect} from 'react';

import {block} from '../../../../../utils';

import {NavigationItemProps} from '../../NavigationItem';
import {NavigationGithubButton, NavigationGithubButtonIcon} from '../../../../../models';

import './GithubButton.scss';

const b = block('github-button');

type NavigationGithubButtonProps = NavigationItemProps & NavigationGithubButton;

const DEFAULT_LABEL = 'Stars on GitHub';

/* More information about github-buttons in https://buttons.github.io/ */
export const GithubButton = ({
    text,
    url,
    className,
    label,
    size,
    icon,
}: NavigationGithubButtonProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const paint = () => {
            if (containerRef.current) {
                const githubButton = containerRef.current.appendChild(
                    document.createElement('span'),
                );
                import(/* webpackMode: "eager" */ 'github-buttons').then(({render}) => {
                    if (linkRef.current !== null) {
                        render(githubButton.appendChild(linkRef.current), (el) => {
                            try {
                                if (githubButton.parentNode) {
                                    githubButton.parentNode.replaceChild(el, githubButton);
                                }
                            } catch (_) {}
                        });
                    }
                });
            }
        };

        const reset = () => {
            if (containerRef?.current?.lastChild && linkRef.current) {
                containerRef.current.replaceChild(linkRef.current, containerRef.current.lastChild);
            }
        };

        paint();

        return () => {
            reset();
        };
    }, []);

    return (
        <div className={b(null, className)}>
            <span ref={containerRef}>
                <a
                    href={url}
                    ref={linkRef}
                    data-show-count="true"
                    aria-label={label || DEFAULT_LABEL}
                    {...(icon && {'data-icon': NavigationGithubButtonIcon[icon]})}
                    {...(size && {'data-size': size})}
                >
                    {text}
                </a>
            </span>
        </div>
    );
};
