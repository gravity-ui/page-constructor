import {ThemeSupporting, getThemedValue} from '../../utils';
import * as icons from '@gravity-ui/icons';
import {Icon as UiKitIcon} from '@gravity-ui/uikit';
import Image, {ImageProps as ImageComponentProps} from '../Image/Image';
import {getMediaImage} from '../Media/Image/utils';
import {useTheme} from '../../context/theme';

type IconParams = ThemeSupporting<
    // @ts-ignore
    | ImageComponentProps['image']
    | {name: keyof typeof icons; theme: 'default' | 'white' | 'black'}
    | string
>;

type Props = {
    icon: IconParams;
    imageProps: Omit<ImageComponentProps, 'image'>;
};

const Icon = ({icon, imageProps}: Props) => {
    const theme = useTheme();
    const themedIcon = getThemedValue(icon, theme);

    const isUikitIcon =
        (typeof themedIcon === 'string' && themedIcon in icons) ||
        (typeof themedIcon === 'object' && themedIcon && 'name' in themedIcon);

    if (isUikitIcon) {
        const data = (
            typeof themedIcon === 'string' ? themedIcon : themedIcon.name
        ) as keyof typeof icons;

        return <UiKitIcon data={icons[data]} className={imageProps.className} />;
    }

    const iconProps = getMediaImage(themedIcon);

    return <Image {...iconProps} {...imageProps} />;
};

export default Icon;
