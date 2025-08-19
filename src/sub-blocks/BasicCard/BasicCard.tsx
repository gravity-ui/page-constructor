import {useUniqId} from '@gravity-ui/uikit';

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
        size = 's',
        gravityIcon,
        ...cardParams
    } = props;
    const titleId = useUniqId();
    const descriptionId = useUniqId();
    const areControlsInFooter = controlPosition === 'footer';
    const theme = useTheme();
    const themedIcon = getThemedValue(icon, theme);
    const themedGravityIcon = getThemedValue(gravityIcon, theme);

    return (
        <CardBase
            className={b()}
            contentClassName={b('content')}
            {...cardParams}
            extraProps={{'aria-describedby': descriptionId, 'aria-labelledby': titleId}}
        >
            <CardBase.Content>
                <IconWrapper
                    icon={themedIcon ? {value: themedIcon, position: iconPosition} : undefined}
                    gravityIcon={
                        themedGravityIcon
                            ? {value: themedGravityIcon, position: iconPosition}
                            : undefined
                    }
                    className={b('wrapper')}
                    size={size}
                >
                    <Content
                        title={title}
                        titleId={titleId}
                        text={text}
                        textId={descriptionId}
                        additionalInfo={additionalInfo}
                        links={links}
                        list={list}
                        buttons={buttons}
                        size={size}
                        colSizes={{all: 12, md: 12}}
                        controlPosition={areControlsInFooter ? 'bottom' : 'default'}
                    />
                </IconWrapper>
            </CardBase.Content>
        </CardBase>
    );
};

export default BasicCard;
