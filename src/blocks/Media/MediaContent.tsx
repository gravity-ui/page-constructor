import React from 'react';
import {HTML} from '@doc-tools/components';

import {block} from '../../utils';
import {ButtonProps, LinkProps} from '../../models';
import {Button} from '../../components';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import Links from '../../components/Link/Links';

import './MediaContent.scss';

const b = block('media-content');

interface MediaContentProps {
    title: string;
    description?: string;
    button?: Pick<ButtonProps, 'text' | 'url'>;
    links?: LinkProps[];
}

interface DescriptionProps {
    description?: string;
}

interface ButtonComponentProps {
    button?: Pick<ButtonProps, 'text' | 'url'>;
}

const Description: React.FC<DescriptionProps> = (props) => {
    if (!props.description) {
        return null;
    }

    return (
        <div className={b('description')}>
            <YFMWrapper
                content={props.description}
                modifiers={{
                    constructor: true,
                }}
            />
        </div>
    );
};

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {
    if (!props.button) {
        return null;
    }

    return <Button className={b('button')} size="xl" {...props.button} />;
};

const MediaContent: React.FC<MediaContentProps> = (props) => {
    const {title, description, button, links} = props;

    return (
        <div className={b('info', {center: !(button && links)})}>
            <div>
                <h2 className={b('title')}>
                    <HTML>{title}</HTML>
                </h2>
                <Description description={description} />
                <Links links={links} />
            </div>
            <ButtonComponent button={button} />
        </div>
    );
};

export default MediaContent;
