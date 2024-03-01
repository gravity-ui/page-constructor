import React, {useMemo} from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import {CardBase, IconWrapper} from '../../components';
import {BasicCardProps} from '../../models';
import {IconPosition} from '../../models/constructor-items/sub-blocks';
import {block} from '../../utils';
import renderContentControls from '../../utils/renderContentControls/renderContentControls';
import Content from '../Content/Content';
import renderCardFooterControlsContainer from '../renderCardFooterControlsContainer/renderCardFooterControlsContainer';

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
    const footerControls = useMemo(
        () =>
            renderContentControls(
                {
                    links: areControlsInFooter ? links : undefined,
                    buttons: areControlsInFooter ? buttons : undefined,
                    size: 's',
                    titleId,
                },
                renderCardFooterControlsContainer,
            ),
        [areControlsInFooter, links, buttons, titleId],
    );

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
            {footerControls}
        </CardBase>
    );
};

export default BasicCard;
