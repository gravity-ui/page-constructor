import React from 'react';

import {block} from '../../../utils';
import YFMWrapper from '../../../components/YFMWrapper/YFMWrapper';
import {Modifiers} from '../../../models';

import './PreviewContent.scss';

const b = block('preview-content-block');

interface PreviewContentProps {
    id: number;
    title: string;
    description?: string;
    switching: boolean;
    onClick: () => void;
    mods: Modifiers | null;
}

const PreviewContent = (props: PreviewContentProps) => {
    const {id, title, description = '', switching, onClick, mods} = props;

    return (
        <div key={id} className={b('content-wrapper')}>
            <div className={b('content', mods)} onClick={onClick}>
                <div className={b('loader-block', {...mods, auto: switching})}></div>
                <h2 className={b('title')}>{title}</h2>
                {description && (
                    <div className={b('description')}>
                        <YFMWrapper content={description} modifiers={{constructor: true}} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PreviewContent;
