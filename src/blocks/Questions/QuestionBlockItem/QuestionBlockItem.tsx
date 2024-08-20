import React from 'react';

import {useActionHandlers} from '@gravity-ui/uikit';

import {Foldable, HTML, ToggleArrow, YFMWrapper} from '../../../components';
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
            <h3
                className={b('title')}
                onClick={onClick}
                aria-expanded={isOpened}
                // TODO fix in https://github.com/gravity-ui/page-constructor/issues/966
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role={'button'}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                <HTML itemProp={FaqMicrodataValues.QuestionNameProp}>{itemTitle}</HTML>
                <ToggleArrow
                    open={isOpened}
                    size={16}
                    type={'vertical'}
                    iconType="navigation"
                    className={b('arrow')}
                />
            </h3>
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
