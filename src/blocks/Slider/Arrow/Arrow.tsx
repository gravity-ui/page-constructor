import ToggleArrow from '../../../components/ToggleArrow/ToggleArrow';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {i18n} from '../i18n';

import './Arrow.scss';

const b = block('slider-arrow');

export type ArrowType = 'left' | 'right';

export interface ArrowProps {
    type: ArrowType;
    transparent?: boolean;
    onClick?: () => void;
    size?: number;
    extraProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Arrow = ({
    type,
    transparent,
    onClick,
    className,
    size = 16,
    extraProps,
}: ArrowProps & ClassNameProps) => (
    <div className={b(null, className)}>
        <button
            className={b('button')}
            onClick={onClick}
            aria-label={i18n(`arrow-${type}`)}
            {...extraProps}
        >
            <div className={b('inner', {type, transparent})}>
                <span className={b('icon-wrapper')}>
                    <ToggleArrow
                        size={size}
                        type={'horizontal'}
                        iconType="navigation"
                        className={b('icon')}
                    />
                </span>
            </div>
        </button>
    </div>
);

export default Arrow;
