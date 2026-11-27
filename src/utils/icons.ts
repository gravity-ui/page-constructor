import * as GravityIcons from '@gravity-ui/icons';
import {IconData} from '@gravity-ui/uikit';

export function getGravityIcon(iconName: string): IconData | undefined {
    if (hasGravityIcon(iconName)) {
        return GravityIcons[iconName];
    }

    return undefined;
}

export function hasGravityIcon(
    iconName: string,
): iconName is Exclude<keyof typeof GravityIcons, 'default'> {
    return iconName !== 'default' && Object.prototype.hasOwnProperty.call(GravityIcons, iconName);
}
