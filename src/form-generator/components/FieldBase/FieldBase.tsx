import * as React from 'react';
import {ArrowToggle, Button, Icon} from '@gravity-ui/uikit';
import {ArrowRotateLeft} from '@gravity-ui/icons';
import _ from 'lodash';

import {formGeneratorCn} from '../../utils/cn';

import './FieldBase.scss';

const b = formGeneratorCn('field-base');

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
    onRefresh,
}) => {
    const [showChildren, setShowChildren] = React.useState(!expandable);

    const titleComponent = React.useMemo(() => {
        if (title) {
            const defaultTitle = (
                <div className={b('title', {size: textSize})}>
                    <span>{_.capitalize(title)}</span>
                    {onRefresh && (
                        <Button
                            className={b('button')}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                onRefresh(undefined);
                            }}
                            view={'flat'}
                            size={'xs'}
                        >
                            <Icon data={ArrowRotateLeft} size={14} />
                        </Button>
                    )}
                </div>
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
    }, [expandable, showChildren, textSize, title, onRefresh]);

    return (
        <div className={b({expandable}, className)}>
            {title && <div className={b('top')}>{titleComponent}</div>}
            {(!title || showChildren) && (
                <div className={b('children', {expandable})}>{children}</div>
            )}
        </div>
    );
};

export default FieldBase;
