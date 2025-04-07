import {ArrowToggle} from '@gravity-ui/uikit';
import _ from 'lodash';
import * as React from 'react';

import {editorCn} from '../../../utils/cn';

import './FieldBase.scss';

const b = editorCn('field-base');

export interface FieldBaseParams {
    title?: string;
    textSize?: 's' | 'm' | 'l';
    onRefresh?: (value: undefined) => void;
    expandable?: boolean;
}

export interface FieldBaseProps extends React.PropsWithChildren, FieldBaseParams {
    className?: string;
}

const FieldBase: React.FC<FieldBaseProps> = ({
    className,
    title,
    textSize = 's',
    children,
    expandable = false,
}) => {
    const [showChildren, setShowChildren] = React.useState(!expandable);

    const titleComponent = React.useMemo(() => {
        if (title) {
            const defaultTitle = (
                <div className={b('title', {size: textSize})}>{_.capitalize(title)}</div>
            );

            if (expandable) {
                return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div className={b('foldable')} onClick={() => setShowChildren(!showChildren)}>
                        {defaultTitle}
                        <ArrowToggle
                            direction={showChildren ? 'bottom' : 'right'}
                            className={b('arrow-toggle')}
                        />
                    </div>
                );
            }

            return <div className={b('non-foldable')}>{defaultTitle}</div>;
        }

        return null;
    }, [expandable, showChildren, textSize, title]);

    return (
        <div className={b({expandable}, className)}>
            {title && <div className={b('top')}>{titleComponent}</div>}
            {(!title || showChildren) && <div className={b('children')}>{children}</div>}
        </div>
    );
};

export default FieldBase;
