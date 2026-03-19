import Base from '../Base/Base';
import {ArrowToggle, DropdownMenu, Icon, Text} from '@gravity-ui/uikit';
import Fields from '../Fields/Fields';
import {formGeneratorCn} from '../../utils/cn';
import {EllipsisVertical} from '@gravity-ui/icons';
import './Section.scss';
import {useState} from 'react';

const b = formGeneratorCn('section');
const Section = ({title, opened, fields, when, content, onUpdate}) => {
    const [isOpened, setOpened] = useState(opened);
    const Summary = () => (
        <div className={b('header')}>
            <div className={b('header-button')} onClick={() => setOpened((prev) => !prev)}>
                <ArrowToggle direction={isOpened ? 'top' : 'bottom'} className={b('arrow')} />
                <Text variant="subheader-1" color="hint">
                    {title}
                </Text>
            </div>
            {isOpened && (
                <DropdownMenu
                    icon={<Icon data={EllipsisVertical} width={16} height={16} />}
                    items={[
                        {
                            text: 'Clear all fields',
                            action: () => {
                                console.log(123);
                            },
                        },
                    ]}
                />
            )}
        </div>
    );

    return (
        <Base when={when} content={content}>
            <div className={b({opened: isOpened})}>
                <Summary />
                <div className={b('children', {opened: isOpened})}>
                    <Fields fields={fields} content={content} onUpdate={onUpdate} />
                </div>
            </div>
        </Base>
    );
};

export default Section;
