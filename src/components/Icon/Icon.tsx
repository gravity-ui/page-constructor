import {ThemeSupporting, block, getThemedValue} from '../../utils';
import * as icons from '@gravity-ui/icons';
import {Icon as UiKitIcon} from '@gravity-ui/uikit';
import {useTheme} from '../../context/theme';
import './Icon.scss';
import {GravityIconProps} from '../../models';

const b = block('icon');

type Props = {
    icon: ThemeSupporting<GravityIconProps>;
    className?: string;
};

const Icon = ({icon, className}: Props) => {
    const theme = useTheme();

    if (!icon) {
        return null;
    }

    const themedIcon = getThemedValue(icon, theme);
    const data = (
        typeof themedIcon === 'string' ? themedIcon : themedIcon.name
    ) as keyof typeof icons;
    const color = typeof themedIcon === 'string' ? 'brand' : themedIcon.color;

    return (
        <div className={b({color}, className)}>
            <UiKitIcon data={icons[data]} />
        </div>
    );
};

export default Icon;
