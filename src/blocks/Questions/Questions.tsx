import * as React from 'react';

import {Col, Row} from '../../grid';
import {QuestionsProps} from '../../models';
import {Content} from '../../sub-blocks';
import {block} from '../../utils';

import {QuestionBlockItem} from './QuestionBlockItem/QuestionBlockItem';
import {FaqMicrodataValues} from './models';

import './Questions.scss';

const b = block('QuestionsBlock');

const QuestionsBlock = (props: QuestionsProps) => {
    const {title, text, additionalInfo, links, buttons, items, list} = props;
    const [opened, setOpened] = React.useState<number[]>([0]);

    const toggleItem = (index: number) => {
        let newState;

        if (opened.includes(index)) {
            newState = opened.filter((itemIndex: number) => itemIndex !== index);
        } else {
            newState = [...opened, index];
        }

        setOpened(newState);
    };

    return (
        <div
            className={b()}
            itemScope
            itemType={FaqMicrodataValues.PageType}
            itemID={FaqMicrodataValues.PageId}
        >
            <Row>
                <Col sizes={{all: 12, md: 4}}>
                    <div className={b('title')}>
                        <Content
                            title={title}
                            text={text}
                            additionalInfo={additionalInfo}
                            links={links}
                            list={list}
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
