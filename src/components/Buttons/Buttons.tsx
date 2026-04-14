import * as React from 'react';

import {ButtonProps, ContentSize} from '../../models';
import {block} from '../../utils';
import Button from '../Button/Button';

import './Buttons.scss';

const b = block('buttons');

type ButtonsProps = {
    className?: string;
    buttons?: (ButtonProps | React.ReactNode)[];
    size?: ContentSize;
    titleId?: string;
    qa?: string;
    buttonQa?: string;
};

function getButtonSize(size: ContentSize) {
    switch (size) {
        case 's':
            return 'm';
        case 'm':
        case 'l':
        case 'xl':
        default:
            return 'xl';
    }
}

const Buttons = ({className, titleId, buttons, size = 's', qa, buttonQa}: ButtonsProps) =>
    buttons ? (
        <div className={b({size}, className)} data-qa={qa}>
            {buttons.map((item, index) =>
                React.isValidElement(item) ? (
                    <React.Fragment key={index}>{item}</React.Fragment>
                ) : (
                    <Button
                        className={b('button')}
                        {...(item as ButtonProps)}
                        key={(item as ButtonProps).url}
                        size={getButtonSize(size)}
                        qa={buttonQa}
                        extraProps={{
                            'aria-describedby': (item as ButtonProps).urlTitle
                                ? undefined
                                : titleId,
                            ...(item as ButtonProps).extraProps,
                        }}
                    />
                ),
            )}
        </div>
    ) : null;

export default Buttons;
