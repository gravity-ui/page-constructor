import * as React from 'react';

import {Card} from '@gravity-ui/uikit';

import {editorCn} from '../../utils/cn';

import {defaultIcon} from './defaultIcon';

import './BlockCard.scss';

const b = editorCn('block-card');

export interface BlockCardProps {
    className?: string;
    type: string;
    name: string;
    previewImg?: string;
    onMouseDown: (type: string) => void;
}

const BlockCard = ({className, type, name, previewImg, onMouseDown}: BlockCardProps) => {
    const handleMouseDown = React.useCallback(() => {
        onMouseDown(type);
    }, [onMouseDown, type]);

    return (
        <Card className={b(null, className)} onMouseDown={handleMouseDown}>
            <div className={b('image')}>
                {previewImg ? (
                    <img className={b('image-img')} src={previewImg} alt="preview of the block" />
                ) : (
                    <img className={b('image-img')} src={defaultIcon} alt="preview of the block" />
                )}
            </div>
            <div className={b('name')}>{name}</div>
        </Card>
    );
};

export default BlockCard;
