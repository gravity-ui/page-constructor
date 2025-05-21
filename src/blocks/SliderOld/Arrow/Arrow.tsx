import ToggleArrow from '../../../components/ToggleArrow/ToggleArrow';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {i18n} from '../i18n';

import './Arrow.scss';

const b = block('slider-old-block-arrow');

export type ArrowType = 'left' | 'right';

export interface ArrowProps {
    type: ArrowType;
    handleClick?: (direction: ArrowType) => void;
    size?: number;
}

const Arrow = ({type, handleClick, className, size = 16}: ArrowProps & ClassNameProps) => (
    <div className={b({type}, className)}>
        <button
            className={b('button')}
            onClick={handleClick ? () => handleClick(type) : undefined}
            aria-label={i18n(`arrow-${type}`)}
        >
            <span className={b('icon-wrapper')}>
                <ToggleArrow
                    size={size}
                    type={'horizontal'}
                    iconType="navigation"
                    className={b('icon')}
                />
            </span>
        </button>
    </div>
);

export default Arrow;
