import React from 'react';
import {ButtonSize} from '@yandex-cloud/uikit';

import {block} from '../../utils';
import {MediaContentProps} from '../../models';
import Content from '../../components/Content/Content';

import './MediaContent.scss';

const b = block('media-content');

const MediaContent: React.FC<MediaContentProps> = (props) => {
    const {title, description, button, links, buttons = [], additionalInfo, size = 'l'} = props;
    const allButtons = button ? [{...button, size: 'xl' as ButtonSize}, ...buttons] : buttons;
    return (
        <div className={b()}>
            <Content
                title={title}
                text={description}
                links={links}
                theme="default"
                buttons={allButtons}
                additionalInfo={additionalInfo}
                size={size}
                colSizes={{all: 12, md: 12}}
            />
        </div>
    );
};

export default MediaContent;
