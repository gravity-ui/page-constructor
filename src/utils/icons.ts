import * as GravityIcons from '@gravity-ui/icons';
import {IconData} from '@gravity-ui/uikit';

export function getGravityIcon(iconName: string): IconData | undefined {
    if (hasGravityIcon(iconName)) {
        return (GravityIcons as Record<string, IconData>)[iconName];
    }

    return undefined;
}

export function hasGravityIcon(iconName: string): boolean {
    return iconName in GravityIcons;
}
