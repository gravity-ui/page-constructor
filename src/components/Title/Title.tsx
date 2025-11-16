import {Col, GridColumnSizesType} from '../../grid';
import {ClassNameProps, TitleItemProps, TitleProps as TitleParams} from '../../models';
import {block} from '../../utils';
import YFMWrapper from '../YFMWrapper/YFMWrapper';

import TitleItem from './TitleItem';

import './Title.scss';

const b = block('title');

export interface TitleProps extends TitleParams, ClassNameProps {
    colSizes?: GridColumnSizesType;
    id?: string;
}

const Title = ({title, subtitle, className, colSizes = {all: 12, sm: 8}, id}: TitleProps) => {
    if (!title && !subtitle) {
        return null;
    }

    const {text, ...titleProps} =
        !title || typeof title === 'string' ? ({text: title} as TitleItemProps) : title;

    return (
        <div className={b(null, className)} id={id}>
            {text && (
                <Col reset sizes={colSizes}>
                    <TitleItem text={text} {...titleProps} />
                </Col>
            )}
            {subtitle && (
                <Col reset sizes={colSizes}>
                    <div className={b('description', {titleSize: titleProps?.textSize})}>
                        <YFMWrapper content={subtitle} modifiers={{constructor: true}} />
                    </div>
                </Col>
            )}
        </div>
    );
};

export default Title;
