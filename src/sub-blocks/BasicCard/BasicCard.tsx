import React from 'react';

import {CardBase, IconWrapper} from '../../components';
import {useTheme} from '../../context/theme';
import {BasicCardProps} from '../../models';
import {IconPosition} from '../../models/constructor-items/sub-blocks';
import {block, getThemedValue} from '../../utils';
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
    const areControlsInFooter = controlPosition === 'footer';
    const theme = useTheme();
    const themedIcon = getThemedValue(icon, theme);

    return (
        <CardBase
            className={b()}
            contentClassName={b('content')}
            {...cardParams}
            extraProps={{role: 'group'}}
        >
            <CardBase.Content>
                <IconWrapper
                    icon={themedIcon ? {value: themedIcon, position: iconPosition} : undefined}
                    className={b('wrapper')}
                >
                    <Content
                        title={title}
                        text={text}
                        additionalInfo={additionalInfo}
                        links={links}
                        list={list}
                        buttons={buttons}
                        size="s"
                        colSizes={{all: 12, md: 12}}
                        controlPosition={areControlsInFooter ? 'bottom' : 'default'}
                        a11yProps={{
                            title: {role: 'link', tabIndex: 0},
                        }}
                    />
                </IconWrapper>
            </CardBase.Content>
        </CardBase>
    );
};

export default BasicCard;
