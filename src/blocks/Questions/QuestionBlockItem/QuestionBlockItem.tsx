import {useActionHandlers} from '@gravity-ui/uikit';

import {Foldable, ToggleArrow, YFMWrapper} from '../../../components';
import Link from '../../../components/Link/Link';
import {QuestionBlockItemProps} from '../../../models';
import {block} from '../../../utils';

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
        <div className={b()} role={'listitem'}>
            <button
                className={b('button')}
                onClick={onClick}
                aria-expanded={isOpened}
                onKeyDown={onKeyDown}
            >
                <YFMWrapper
                    tagName="h3"
                    className={b('title-container')}
                    contentClassName={b('title')}
                    content={itemTitle}
                    modifiers={{
                        constructor: true,
                    }}
                    onClick={onClick}
                    tabIndex={0}
                >
                    <ToggleArrow
                        open={isOpened}
                        size={16}
                        type={'vertical'}
                        iconType="navigation"
                        className={b('arrow')}
                    />
                </YFMWrapper>
            </button>
            <Foldable isOpened={isOpened}>
                <div className={b('text')} aria-hidden={!isOpened}>
                    <YFMWrapper
                        content={itemText}
                        modifiers={{
                            constructor: true,
                            constructorListStyle: true,
                            constructorListStyleDash: listStyle === 'dash',
                        }}
                    />
                    {link && <Link {...link} tabIndex={isOpened ? 0 : -1} className={b('link')} />}
                </div>
            </Foldable>
        </div>
    );
};
