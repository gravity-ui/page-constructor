import {useTheme} from '../../context/theme';
import {ClassNameProps, GravityIconProps, ImageProps, QAProps, SVGIcon} from '../../models';
import {ThemeSupporting, getThemedValue} from '../../utils';
import Icon from '../Icon/Icon';

interface ListItemProps extends QAProps, ClassNameProps {
    icon?: ThemeSupporting<ImageProps | SVGIcon>;
    gravityIcon?: ThemeSupporting<GravityIconProps>;
}

function isIconSvg(icon: ImageProps | SVGIcon): icon is SVGIcon {
    return typeof icon === 'function';
}

const ContentListItemIcon = ({icon, className, qa, gravityIcon}: ListItemProps) => {
    const theme = useTheme();
    const iconThemed = getThemedValue(icon, theme);
    const gravityIconThemed = getThemedValue(gravityIcon, theme);

    if (iconThemed && isIconSvg(iconThemed)) {
        const IconComponent = iconThemed;
        return (
            <div>
                <IconComponent className={className} />
            </div>
        );
    }

    return <Icon icon={iconThemed} gravityIcon={gravityIconThemed} className={className} qa={qa} />;
};

export default ContentListItemIcon;
