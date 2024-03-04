import React from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import {Buttons, CardBase, IconWrapper, Links} from '../../components';
import {BasicCardProps} from '../../models';
import {IconPosition} from '../../models/constructor-items/sub-blocks';
import {block} from '../../utils';
import Content from '../Content/Content';

import './BasicCard.scss';

const b = block('basic-card');

const BasicCard = (props: BasicCardProps) => {
    const {
        title,
        text,
        icon,
        additionalInfo,
        links,
        list,
        buttons,
        iconPosition = IconPosition.Top,
        controlPosition = 'content',
        ...cardParams
    } = props;
    const titleId = useUniqId();
    const descriptionId = useUniqId();
    const areControlsInFooter = controlPosition === 'footer';

    return (
        <CardBase
            className={b()}
            {...cardParams}
            extraProps={{'aria-describedby': descriptionId, 'aria-labelledby': titleId}}
        >
            <CardBase.Content>
                <IconWrapper icon={icon ? {value: icon, position: iconPosition} : undefined}>
                    <Content
                        title={title}
                        titleId={titleId}
                        text={text}
                        textId={descriptionId}
                        additionalInfo={additionalInfo}
                        links={areControlsInFooter ? undefined : links}
                        list={list}
                        buttons={areControlsInFooter ? undefined : buttons}
                        size="s"
                        colSizes={{all: 12, md: 12}}
                    />
                </IconWrapper>
            </CardBase.Content>
            {areControlsInFooter && (buttons || links) && (
                <CardBase.Footer className={b('footer')}>
                    <Links className={b('links')} size="s" links={links} titleId={titleId} />
                    <Buttons
                        className={b('buttons')}
                        size="s"
                        buttons={buttons}
                        titleId={titleId}
                    />
                </CardBase.Footer>
            )}
        </CardBase>
    );
};

export default BasicCard;
