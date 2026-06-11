import FormGenerator from '../../../form-generator-v2/FormGenerator';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';
import {editorCn} from '../../utils/cn';

import './GlobalConfig.scss';

const b = editorCn('global-config');

export interface GlobalConfigProps {
    className?: string;
}

const GlobalConfig = ({className}: GlobalConfigProps) => {
    const {global, content, updateField} = useMainEditorStore();

    const onUpdate = (key: string, value: unknown) => {
        updateField(key, value);
    };

    return (
        <div className={b(null, className)}>
            <div className={b('title')}>Global Config</div>
            <FormGenerator contentConfig={content} blockConfig={global} onUpdateByKey={onUpdate} />
        </div>
    );
};

export default GlobalConfig;
