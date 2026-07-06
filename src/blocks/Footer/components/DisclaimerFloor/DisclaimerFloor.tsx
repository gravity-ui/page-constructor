import {YFMWrapper} from '../../../../components';
import {Col} from '../../../../grid';
import {FooterBlockProps} from '../../../../models';
import {block} from '../../../../utils';

import './DisclaimerFloor.scss';

const b = block('footer-block');

type DisclaimerFloorProps = {
    disclaimer: NonNullable<FooterBlockProps['disclaimer']>;
};

export const DisclaimerFloor = ({disclaimer}: DisclaimerFloorProps) => {
    return (
        <Col sizes={{all: 12}} className={b('floor', {disclaimer: true})}>
            <div
                className={b('disclaimer-floor-content', {
                    align: disclaimer.align || 'left',
                })}
            >
                <YFMWrapper
                    content={disclaimer.text}
                    modifiers={{
                        constructor: true,
                        'constructor-notice': true,
                    }}
                />
            </div>
        </Col>
    );
};
