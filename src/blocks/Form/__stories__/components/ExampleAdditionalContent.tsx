import ContentIcon from '../../../../components/ContentIcon/ContentIcon';
import {
    ClassNameProps,
    ContentSize,
    ContentTheme,
    GravityIconProps,
    ImageProps,
    SVGIcon,
} from '../../../../models';
import {ThemeSupporting, block} from '../../../../utils';

import './ExampleAdditionalContent.scss';

const b = block('content-labels');

export interface ContentLabelProps {
    text: string;
    icon?: ThemeSupporting<ImageProps | SVGIcon>;
    gravityIcon?: ThemeSupporting<GravityIconProps>;
}

export interface ContentLabelsProps {
    labels: ContentLabelProps[];
    size?: ContentSize;
    theme?: ContentTheme;
}

const ExampleAdditionalContent = ({
    className,
    labels,
    theme,
    size = 'l',
}: ContentLabelsProps & ClassNameProps) => (
    <div className={b({size}, className)}>
        {labels.map((label) => {
            const {text, icon, gravityIcon} = label;

            return (
                <div key={text} className={b('label', {theme})}>
                    <ContentIcon
                        className={b('label-icon')}
                        icon={icon}
                        gravityIcon={gravityIcon}
                    />
                    <span className={b('label-text')}>{text}</span>
                </div>
            );
        })}
    </div>
);

export default ExampleAdditionalContent;
