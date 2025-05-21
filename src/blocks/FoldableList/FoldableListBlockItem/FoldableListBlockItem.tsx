import {useActionHandlers} from '@gravity-ui/uikit';

import {Foldable, ToggleArrow, YFMWrapper} from '../../../components';
import Link from '../../../components/Link/Link';
import {FoldableListBlockItemProps} from '../../../models';
import {block} from '../../../utils';

import './FoldableListBlockItem.scss';

const b = block('FoldableListBlockItem');

export const FoldableListBlockItem = ({
    title: itemTitle,
    text: itemText,
    link,
    listStyle = 'dash',
    isOpened,
    onClick,
}: FoldableListBlockItemProps) => {
    const {onKeyDown} = useActionHandlers(onClick);

    return (
        <div className={b()} itemScope role={'listitem'}>
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
