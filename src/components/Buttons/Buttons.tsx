import * as React from 'react';

import {ButtonProps, ContentSize} from '../../models';
import {block} from '../../utils';
import Button from '../Button/Button';

import './Buttons.scss';

const b = block('buttons');

type ButtonsProps = {
    className?: string;
    buttons?: ButtonProps[];
    size?: ContentSize;
    titleId?: string;
    qa?: string;
    buttonQa?: string;
};

function getButtonSize(size: ContentSize) {
    switch (size) {
        case 's':
            return 'm';
        case 'l':
        default:
            return 'xl';
    }
}

const Buttons = ({
    className,
    titleId,
    buttons,
    size = 's',
    qa,
    buttonQa,
}: React.PropsWithChildren<ButtonsProps>) =>
    buttons ? (
        <div className={b({size}, className)} data-qa={qa}>
            {buttons.map((item) => (
                <Button
                    className={b('button')}
                    {...item}
                    key={item.url}
                    size={getButtonSize(size)}
                    qa={buttonQa}
                    extraProps={{
                        'aria-describedby': item.urlTitle ? undefined : titleId,
                        ...item.extraProps,
                    }}
                />
            ))}
        </div>
    ) : null;

export default Buttons;
