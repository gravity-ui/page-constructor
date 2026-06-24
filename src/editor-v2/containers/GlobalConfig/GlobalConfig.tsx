import FormGenerator from '../../../form-generator-v2/FormGenerator';
import {useMainEditorStore} from '../../hooks/useMainEditorStore';

export interface GlobalConfigProps {
    className?: string;
}

const GlobalConfig = ({className}: GlobalConfigProps) => {
    const {global, content, updateField} = useMainEditorStore();

    const onUpdate = (key: string, value: unknown) => {
        updateField(key, value);
    };

    return (
        <div className={className}>
            <FormGenerator contentConfig={content} blockConfig={global} onUpdateByKey={onUpdate} />
        </div>
    );
};

export default GlobalConfig;
