import {ClassNameProps, ContentLabelsProps, QAProps} from '../../models';
import {block, getQaAttrubutes} from '../../utils';
import ContentIcon from '../ContentIcon/ContentIcon';

import './ContentLabels.scss';

const b = block('content-labels');

const ContentLabels = ({
    className,
    labels,
    theme,
    size = 'l',
    qa,
}: ContentLabelsProps & ClassNameProps & QAProps) => {
    const qaAttributes = getQaAttrubutes(qa, ['icon', 'text']);

    return (
        <div className={b({size}, className)}>
            {labels.map((label) => {
                const {text, icon, gravityIcon} = label;

                return (
                    <div key={text} className={b('label', {theme})}>
                        <ContentIcon
                            className={b('label-icon')}
                            icon={icon}
                            gravityIcon={gravityIcon}
                            qa={qaAttributes.icon}
                        />
                        <span className={b('label-text')} data-qa={qaAttributes.text}>
                            {text}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default ContentLabels;
