import React from 'react';

import {useActionHandlers} from '@gravity-ui/uikit';

import {Foldable, ToggleArrow, YFMWrapper} from '../../../components';
import Link from '../../../components/Link/Link';
import {QuestionBlockItemProps} from '../../../models';
import {block} from '../../../utils';
import {FaqMicrodataValues} from '../models';

import './QuestionBlockItem.scss';

const b = block('QuestionsBlockItem');

export const QuestionBlockItem = ({
    title: itemTitle,
    text: itemText,
    link,
    listStyle = 'dash',
    isOpened,
    onClick,
}: QuestionBlockItemProps) => {
    const {onKeyDown} = useActionHandlers(onClick);

    return (
        <div
            className={b()}
            itemScope
            itemProp={FaqMicrodataValues.QuestionProp}
            itemType={FaqMicrodataValues.QuestionType}
            role={'listitem'}
        >
            <YFMWrapper
                variant="h3"
                className={b('title-container')}
                contentClassName={b('title')}
                itemProp={FaqMicrodataValues.QuestionNameProp}
                content={itemTitle}
                modifiers={{
                    constructor: true,
                }}
                onClick={onClick}
                role="button"
                aria-expanded={isOpened}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                <ToggleArrow
                    open={isOpened}
                    size={16}
                    type={'vertical'}
                    iconType="navigation"
                    className={b('arrow')}
                />
            </YFMWrapper>
            <Foldable isOpened={isOpened}>
                <div
                    className={b('text')}
                    itemScope
                    itemProp={FaqMicrodataValues.AnswerProp}
                    itemType={FaqMicrodataValues.AnswerType}
                    aria-hidden={!isOpened}
                >
                    <YFMWrapper
                        content={itemText}
                        modifiers={{
                            constructor: true,
                            constructorListStyle: true,
                            constructorListStyleDash: listStyle === 'dash',
                        }}
                        itemProp={FaqMicrodataValues.QuestionTextProp}
                    />
                    {link && <Link {...link} tabIndex={isOpened ? 0 : -1} className={b('link')} />}
                </div>
            </Foldable>
        </div>
    );
};
