import * as React from 'react';

import {CircleInfoFill, EllipsisVertical, Plus} from '@gravity-ui/icons';
import {ArrowToggle, Dialog, DropdownMenu, Icon, Text} from '@gravity-ui/uikit';

import {CommonProps, SectionField} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import {clearSectionFormContent, sectionHasContentData} from '../../utils/fields';
import Base from '../Base/Base';
import Fields from '../Fields/Fields';

import {SectionOpenContext} from './SectionOpenContext';

import './Section.scss';

const b = formGeneratorCn('section');

type SectionProp = CommonProps & SectionField;

const Section = ({title, opened, fields, when, content, onUpdate, note}: SectionProp) => {
    const [isOpened, setOpened] = React.useState(opened);
    const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
    const hasData = sectionHasContentData(fields, content);
    const showArrowTogler = hasData || isOpened;
    const prevHasDataRef = React.useRef<boolean | null>(null);

    React.useEffect(() => {
        const hadData = prevHasDataRef.current;
        if (hadData === true && !hasData) {
            setOpened(false);
        }
        prevHasDataRef.current = hasData;
    }, [hasData]);

    const handleConfirmClear = () => {
        if (onUpdate) {
            clearSectionFormContent(fields, onUpdate);
        }
        setConfirmDialogOpen(false);
        setOpened(false);
    };

    const Summary = () => (
        <div className={b('header')}>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div
                className={b('header-button', {'with-hover': !showArrowTogler})}
                onClick={() => setOpened((prev) => !prev)}
            >
                {showArrowTogler && (
                    <ArrowToggle direction={isOpened ? 'top' : 'bottom'} className={b('arrow')} />
                )}
                <Text variant="subheader-1" color="hint" className={b('title')}>
                    {title}
                </Text>
                {!showArrowTogler && <Plus width={16} height={16} className={b('plus')} />}
            </div>
            {isOpened && (
                <DropdownMenu
                    icon={<Icon data={EllipsisVertical} width={16} height={16} />}
                    items={[
                        {
                            text: 'Clear all fields',
                            action: () => setConfirmDialogOpen(true),
                        },
                    ]}
                />
            )}
        </div>
    );

    const confirmDialog = React.useMemo(
        () => (
            <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)} size="s">
                <Dialog.Header caption="Clear all fields in this block?" />
                <Dialog.Body>
                    <Text variant="body-1">
                        All field values will be deleted, and the block settings will be reset to
                        their default state.
                    </Text>
                </Dialog.Body>
                <Dialog.Footer
                    textButtonApply="Approve"
                    textButtonCancel="Cancel"
                    onClickButtonApply={handleConfirmClear}
                    onClickButtonCancel={() => setConfirmDialogOpen(false)}
                />
            </Dialog>
        ),
        [confirmDialogOpen, handleConfirmClear],
    );

    return (
        <Base when={when} content={content}>
            <React.Fragment>
                <div className={b({opened: isOpened})}>
                    <Summary />
                    <div className={b('children', {opened: isOpened})}>
                        <div className={b('children-inner')}>
                            <SectionOpenContext.Provider value={isOpened}>
                                <Fields fields={fields} content={content} onUpdate={onUpdate} />
                            </SectionOpenContext.Provider>
                        </div>
                    </div>
                    {note && (
                        <div className={b('note')}>
                            <Icon
                                className={b('note-icon')}
                                data={CircleInfoFill}
                                color={note.level}
                            />
                            <Text variant="body-1">{note.text}</Text>
                        </div>
                    )}
                </div>
                {confirmDialog}
            </React.Fragment>
        </Base>
    );
};

export default Section;
