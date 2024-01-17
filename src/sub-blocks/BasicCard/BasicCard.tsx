import React from 'react';

import {useUniqId} from '@gravity-ui/uikit';

import CardBase from '../../components/CardBase/CardBase';
import IconContent from '../../components/IconContent/IconContent';
import {BasicCardProps} from '../../models';
import {IconPosition} from '../../models/constructor-items/sub-blocks';
import {block} from '../../utils';

import './BasicCard.scss';

const b = block('basic-card');

const BasicCard = (props: BasicCardProps) => {
    const {
        title,
        text,
        icon,
        additionalInfo,
        links,
        buttons,
        iconPosition = IconPosition.Top,
        ...cardParams
    } = props;
    const titleId = useUniqId();
    const descriptionId = useUniqId();

    return (
        <CardBase
            className={b()}
            {...cardParams}
            extraProps={{'aria-describedby': descriptionId, 'aria-labelledby': titleId}}
        >
            <CardBase.Content>
                <IconContent
                    icon={icon ? {value: icon, position: iconPosition} : undefined}
                    content={{
                        title,
                        titleId,
                        text,
                        textId: descriptionId,
                        additionalInfo,
                        links,
                        buttons,
                        size: 's',
                        colSizes: {all: 12, md: 12},
                    }}
                />
            </CardBase.Content>
        </CardBase>
    );
};

export default BasicCard;
