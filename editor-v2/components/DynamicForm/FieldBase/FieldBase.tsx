import {ArrowRotateLeft} from '@gravity-ui/icons';
import {ArrowToggle, Button, Icon} from '@gravity-ui/uikit';
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
    textSize,
    children,
    onRefresh,
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
                        <ArrowToggle
                            direction={showChildren ? 'bottom' : 'right'}
                            className={b('arrow-toggle')}
                        />
                        {defaultTitle}
                    </div>
                );
            }

            return <div className={b('non-foldable')}>{defaultTitle}</div>;
        }

        return null;
    }, [expandable, showChildren, textSize, title]);

    return (
        <div className={b(null, className)}>
            {title && (
                <div className={b('top')}>
                    {titleComponent}
                    {onRefresh && (
                        <Button
                            className={b('button')}
                            onClick={() => onRefresh(undefined)}
                            view={'flat'}
                            size={'xs'}
                        >
                            <Icon data={ArrowRotateLeft} size={14} />
                        </Button>
                    )}
                </div>
            )}
            {(!title || showChildren) && <div className={b('children')}>{children}</div>}
        </div>
    );
};

export default FieldBase;
