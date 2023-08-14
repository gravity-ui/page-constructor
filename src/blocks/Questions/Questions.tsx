import React, {useState} from 'react';

import {useActionHandlers} from '@gravity-ui/uikit';

import {Foldable, HTML, ToggleArrow, YFMWrapper} from '../../components';
import Link from '../../components/Link/Link';
import {Col, Row} from '../../grid';
import {QuestionBlockItemProps, QuestionsProps} from '../../models';
import {Content} from '../../sub-blocks';
import {block} from '../../utils';

import './Questions.scss';

const b = block('QuestionsBlock');

const FaqMicrodataValues = {
    PageType: 'https://schema.org/FAQPage',
    QuestionType: 'https://schema.org/Question',
    QuestionProp: 'mainEntity',
    QuestionNameProp: 'name',
    QuestionTextProp: 'text',
    AnswerType: 'https://schema.org/Answer',
    AnswerProp: 'acceptedAnswer',
    AnswerTextProp: 'text',
} as const;

const QuestionBlockItem = ({
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
            className={b('item')}
            itemScope
            itemProp={FaqMicrodataValues.QuestionProp}
            itemType={FaqMicrodataValues.QuestionType}
            role={'listitem'}
        >
            <h3
                className={b('item-title')}
                onClick={onClick}
                aria-expanded={isOpened}
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

const QuestionsBlock = (props: QuestionsProps) => {
    const {title, text, additionalInfo, links, buttons, items} = props;
    const [opened, setOpened] = useState<number[]>([0]);

    const toggleItem = (index: number) => {
        let newState;

        if (opened.includes(index)) {
            newState = opened.filter((intemIndex: number) => intemIndex !== index);
        } else {
            newState = [...opened, index];
        }

        setOpened(newState);
    };

    return (
        <div className={b()} itemScope itemType={FaqMicrodataValues.PageType}>
            <Row>
                <Col sizes={{all: 12, md: 4}}>
                    <div className={b('title')}>
                        <Content
                            title={title}
                            text={text}
                            additionalInfo={additionalInfo}
                            links={links}
                            buttons={buttons}
                            colSizes={{all: 12, md: 12}}
                        />
                    </div>
                </Col>
                <Col sizes={{all: 12, md: 8}} role={'list'}>
                    {items.map(
                        ({title: itemTitle, text: itemText, link, listStyle = 'dash'}, index) => {
                            const isOpened = opened.includes(index);
                            const onClick = () => toggleItem(index);

                            return (
                                <QuestionBlockItem
                                    key={itemTitle}
                                    title={itemTitle}
                                    text={itemText}
                                    link={link}
                                    listStyle={listStyle}
                                    isOpened={isOpened}
                                    onClick={onClick}
                                />
                            );
                        },
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default QuestionsBlock;
