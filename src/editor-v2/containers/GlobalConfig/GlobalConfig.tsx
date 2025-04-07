import {DynamicFormValue} from '../../../../common/types';
import DynamicForm from '../../components/DynamicForm/DynamicForm';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './GlobalConfig.scss';

const b = editorCn('global-config');

export interface GlobalConfigProps {
    className?: string;
}

const GlobalConfig = ({className}: GlobalConfigProps) => {
    const {global, content, updateField} = useMainEditorStore();

    const onUpdate = (key: string, value: DynamicFormValue) => {
        updateField('navigation.' + key, value);
    };

    return (
        <div className={b(null, className)}>
            <div className={b('title')}>Global Config</div>
            <DynamicForm
                contentConfig={content.navigation}
                blockConfig={global}
                onUpdate={onUpdate}
            />
        </div>
    );
};

export default GlobalConfig;
