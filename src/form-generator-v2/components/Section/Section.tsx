import Base from '../Base/Base';
import {ArrowToggle, Dialog, DropdownMenu, Icon, Text} from '@gravity-ui/uikit';
import Fields from '../Fields/Fields';
import {formGeneratorCn} from '../../utils/cn';
import {EllipsisVertical, Plus} from '@gravity-ui/icons';
import './Section.scss';
import * as React from 'react';
import {clearSectionFormContent, sectionHasContentData} from '../../utils/fields';
import {SectionOpenContext} from './SectionOpenContext';

const b = formGeneratorCn('section');

const Section = ({title, opened, fields, when, content, onUpdate}) => {
    const [isOpened, setOpened] = React.useState(opened);
    const [clearConfirmOpen, setClearConfirmOpen] = React.useState(false);
    const hasData = sectionHasContentData(fields, content);
    const showArrowTogler = hasData || isOpened;
    const prevHadDataRef = React.useRef<boolean | null>(null);

    React.useEffect(() => {
        const hadData = prevHadDataRef.current;
        if (hadData === true && !hasData) {
            setOpened(false);
        }
        prevHadDataRef.current = hasData;
    }, [hasData]);

    const handleConfirmClear = () => {
        if (onUpdate) {
            clearSectionFormContent(fields, onUpdate);
        }
        setClearConfirmOpen(false);
        setOpened(false);
    };

    const Summary = () => (
        <div className={b('header')}>
            <div
                className={b('header-button', {'with-hover': !showArrowTogler})}
                onClick={() => setOpened((prev) => !prev)}
            >
                {showArrowTogler && (
                    <ArrowToggle direction={isOpened ? 'top' : 'bottom'} className={b('arrow')} />
                )}
                <Text variant="subheader-1" color="hint">
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
                            action: () => setClearConfirmOpen(true),
                        },
                    ]}
                />
            )}
        </div>
    );

    const confirmDialog = React.useMemo(
        () => (
            <Dialog open={clearConfirmOpen} onClose={() => setClearConfirmOpen(false)} size="s">
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
                    onClickButtonCancel={() => setClearConfirmOpen(false)}
                />
            </Dialog>
        ),
        [clearConfirmOpen, handleConfirmClear],
    );

    return (
        <Base when={when} content={content}>
            <React.Fragment>
                <div className={b({opened: isOpened})}>
                    <Summary />
                    <div className={b('children', {opened: isOpened})}>
                        <SectionOpenContext.Provider value={isOpened}>
                            <Fields fields={fields} content={content} onUpdate={onUpdate} />
                        </SectionOpenContext.Provider>
                    </div>
                </div>
                {confirmDialog}
            </React.Fragment>
        </Base>
    );
};

export default Section;
