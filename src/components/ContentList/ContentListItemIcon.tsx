import {useTheme} from '../../context/theme';
import {ClassNameProps, ImageProps, QAProps, SVGIcon} from '../../models';
import {ThemeSupporting, getThemedValue} from '../../utils';
import Image from '../Image/Image';
import {getMediaImage} from '../Media/Image/utils';

interface ListItemProps extends QAProps, ClassNameProps {
    icon: ThemeSupporting<ImageProps | SVGIcon>;
}

function isIconSvg(icon: ImageProps | SVGIcon): icon is SVGIcon {
    return typeof icon === 'function';
}

const ContentListItemIcon = ({icon, className, qa}: ListItemProps) => {
    const theme = useTheme();
    const iconThemed = getThemedValue(icon, theme);

    if (isIconSvg(iconThemed)) {
        const Icon = iconThemed;
        return (
            <div>
                <Icon className={className} />
            </div>
        );
    }
    const iconData = getMediaImage(iconThemed);
    return <Image {...iconData} className={className} qa={qa} />;
};

export default ContentListItemIcon;
