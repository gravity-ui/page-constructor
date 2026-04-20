// importing Lang as a type so that uikit doesn't get into js code built for server
import type {Lang} from '@gravity-ui/uikit';

// getting values of Lang enum so we can use them later to proper typechecking
type LANG = `${Lang}`; // 'ru' || 'en'

export {LANG as Lang};
