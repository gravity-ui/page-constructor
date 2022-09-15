import React, {useState} from 'react';

import {block} from '../../utils';
import {QuestionsProps, ReactFCC} from '../../models';
import Link from '../../components/Link/Link';

import {YFMWrapper, ToggleArrow, Foldable, HTML} from '../../components';
import {Row, Col} from '../../grid';
import {Content} from '../../sub-blocks';

import './Questions.scss';

const b = block('QuestionsBlock');

const QuestionsBlock: ReactFCC<QuestionsProps> = (props) => {
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
        <div className={b()}>
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
                <Col sizes={{all: 12, md: 8}}>
                    {items.map(
                        ({title: itemTitle, text: itemText, link, listStyle = 'dash'}, index) => {
                            const isOpened = opened.includes(index);

                            return (
                                <div key={itemTitle} className={b('item')}>
                                    <h4
                                        className={b('item-title')}
                                        onClick={() => toggleItem(index)}
                                    >
                                        <HTML>{itemTitle}</HTML>
                                        <ToggleArrow
                                            open={isOpened}
                                            size={16}
                                            type={'vertical'}
                                            iconType="navigation"
                                            className={b('arrow')}
                                        />
                                    </h4>
                                    <Foldable isOpened={isOpened}>
                                        <div className={b('text')}>
                                            <YFMWrapper
                                                content={itemText}
                                                modifiers={{
                                                    constructor: true,
                                                    constructorListStyle: true,
                                                    constructorListStyleDash: listStyle === 'dash',
                                                }}
                                            />
                                            {link && <Link {...link} className={b('link')} />}
                                        </div>
                                    </Foldable>
                                </div>
                            );
                        },
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default QuestionsBlock;
