import {block} from '../../utils';
import * as icons from '@gravity-ui/icons';
import {Icon as UiKitIcon} from '@gravity-ui/uikit';
import {GravityIconProps, ImageProps, QAProps} from '../../models';
import Image, {ImageProps as ImageComponentProps} from '../Image/Image';
import {getMediaImage} from '../Media/Image/utils';

import './Icon.scss';

const b = block('icon');

type Props = {
    gravityIcon?: GravityIconProps;
    icon?: ImageProps;
    className?: string;
} & Pick<ImageComponentProps, 'containerClassName'> &
    QAProps;

const Icon = ({icon, className, gravityIcon, containerClassName, qa}: Props) => {
    if (gravityIcon) {
        const data = (
            typeof gravityIcon === 'string' ? gravityIcon : gravityIcon.name
        ) as keyof typeof icons;
        const color = typeof gravityIcon === 'string' ? 'brand' : gravityIcon.color;

        return (
            <div className={b({color})}>
                <UiKitIcon data={icons[data]} className={className} qa={qa} />
            </div>
        );
    }

    if (icon) {
        const image = getMediaImage(icon);

        return (
            <Image
                {...image}
                containerClassName={containerClassName}
                className={className}
                qa={qa}
            />
        );
    }
    return null;
};

export default Icon;
