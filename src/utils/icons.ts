import * as GravityIcons from '@gravity-ui/icons';
import {IconData} from '@gravity-ui/uikit';

type GravityIconName = Exclude<keyof typeof GravityIcons, 'default'>;

export function getGravityIcon(iconName: string): IconData | undefined {
    return hasGravityIcon(iconName) ? GravityIcons[iconName] : undefined;
}

export function hasGravityIcon(iconName: string): iconName is GravityIconName {
    return iconName !== 'default' && Object.prototype.hasOwnProperty.call(GravityIcons, iconName);
}
