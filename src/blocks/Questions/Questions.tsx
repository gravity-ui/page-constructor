import * as React from 'react';

import {Col, Row} from '../../grid';
import {QuestionsProps} from '../../models';
import {Content} from '../../sub-blocks';
import {block} from '../../utils';
import {sanitizeMicrodata} from '../../utils/microdata';

import {QuestionBlockItem} from './QuestionBlockItem/QuestionBlockItem';

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

    const faqMicrodataScript = React.useMemo(() => {
        try {
            const json = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: items.map((item) => ({
                    '@type': 'Question',
                    name: sanitizeMicrodata(item.title),
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: sanitizeMicrodata(item.text),
                    },
                })),
            });
            return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json}} />;
        } catch (error) {
            /*eslint-disable no-console */
            console.warn('Problem with FAQ microdata', error);
            return null;
        }
    }, [items]);

    return (
        <div className={b()}>
            {faqMicrodataScript}
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
