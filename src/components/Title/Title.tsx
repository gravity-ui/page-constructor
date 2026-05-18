import {Col, GridColumnSizesType, GridJustifyContent} from '../../grid';
import {ClassNameProps, QAProps, TitleItemProps, TitleProps as TitleParams} from '../../models';
import {block, getQaAttrubutes} from '../../utils';
import YFMWrapper from '../YFMWrapper/YFMWrapper';

import TitleItem from './TitleItem';

import './Title.scss';

const b = block('title');

export interface TitleProps extends TitleParams, QAProps {
    colSizes?: GridColumnSizesType;
    colJustifyContent?: GridJustifyContent;
    id?: string;
}

const Title = ({
    title,
    subtitle,
    className,
    colSizes = {all: 12, sm: 8},
    colJustifyContent,
    id,
    qa,
}: TitleProps & ClassNameProps) => {
    if (!title && !subtitle) {
        return null;
    }

    const qaAttributes = getQaAttrubutes(qa, ['title', 'subtitle']);

    const {text, ...titleProps} =
        !title || typeof title === 'string' ? ({text: title} as TitleItemProps) : title;

    return (
        <div className={b(null, className)} id={id}>
            {text && (
                <Col
                    reset
                    sizes={colSizes}
                    {...(colJustifyContent && {justifyContent: colJustifyContent})}
                >
                    <TitleItem text={text} {...titleProps} qa={qaAttributes.title} />
                </Col>
            )}
            {subtitle && (
                <Col
                    reset
                    sizes={colSizes}
                    {...(colJustifyContent && {justifyContent: colJustifyContent})}
                >
                    <div
                        className={b('description', {titleSize: titleProps?.textSize})}
                        data-qa={qaAttributes.subtitle}
                    >
                        <YFMWrapper content={subtitle} modifiers={{constructor: true}} />
                    </div>
                </Col>
            )}
        </div>
    );
};

export default Title;
