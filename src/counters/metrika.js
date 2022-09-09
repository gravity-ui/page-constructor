import {createLogger} from '../utils/logger';
import {getWarnOnce} from './utils';

const Goal = {
    SUPPORT_OPEN_FORM: 'SUPPORTOPENFORM',
    SUPPORT_STEP_1_SUBMIT: 'SUPPORTSTEP1SUBMIT',
    SUPPORT_STEP_2_SUBMIT: 'SUPPORTSTEP2SUBMIT',
    SUPPORT_STEP_3_SUBMIT: 'SUPPORTSTEP3SUBMIT',
    SUPPORT_THANKYOU_SUBMIT: 'SUPPORTTHANKYOUSUBMIT',

    MP_OPEN_FORM: 'MPOPENFORM',

    EDIT_ON_GITHUB: 'EDITONGITHUB',

    MAIN_GO_TO_VAR: 'MAINGOTOVAR',
    MAIN_GO_TO_ISV: 'MAINGOTOISV',
    MAIN_ALL_PARTNERS: 'MAINALLPARTNERS',
    FIND_GO_TO_VAR: 'FINDGOTOVAR',
    ISV_GO_TO_MP: 'ISVGOTOMP',

    FOOTER_SUBSCRIBE: 'FOOTERSUBSCRIBE',
    FOOTER_MNG_SUBSCRIPTIONS: 'FOOTERMNGSUBSCRIPTIONS',

    MOBILE_STORE_IOS: '154_Mobile_App_Store_Badge',
    MOBILE_STORE_ANDROID: '155_Mobile_Google_Play_Badge',

    REGION_POPUP_SHOW: 'REGIONPOPUP',
    REGION_POPUP_YES: 'REGIONPOPUPYES',
    REGION_POPUP_NO: 'REGIONPOPUPNO',
    REGION_POPUP_CLOSE: 'REGIONPOPUPCLOSE',

    SCALE_REGISTRATION: 'Scale_registration',
    DLGOTOPRODUCT_MPSITE: 'DLGOTOPRODUCT_MPSITE',
    MPK8S_CLCK: 'MPK8S_CLCK',
    'SITE_CALCULATOR_SHARE-RESULT_CLICK': 'SITE_CALCULATOR_SHARE-RESULT_CLICK',
};

const HIT_COUNTERS = ['main', 'cross-site', 'scale'];

const counterIds = {};

const warnOnce = getWarnOnce(createLogger('metrika'));

function getCounter(name) {
    const counterId = counterIds[name];

    return window['yaCounter' + counterId];
}

export function initCounters(configs) {
    configs.forEach((config) => {
        counterIds[config.name] = config.id;
    });
}

function hit(...args) {
    HIT_COUNTERS.forEach((counterName) => {
        const counter = getCounter(counterName);

        if (!counter) {
            warnOnce(counterName);
            return;
        }

        counter.hit(...args);
    });
}

function params(...args) {
    const counter = getCounter('main');

    if (!counter) {
        warnOnce('main');
        return;
    }

    counter.params(...args);
}

function reachGoal(counterName, ...args) {
    const counter = getCounter(counterName);

    if (!counter) {
        warnOnce(counterName);
        return;
    }

    counter.reachGoal(...args);
}

function reachGoals(goals, counterName = 'main') {
    if (!goals) {
        return;
    }

    const goalsArray = Array.isArray(goals) ? goals : [goals];

    goalsArray.forEach((goal) => {
        if (typeof goal === 'object') {
            reachGoal(counterName, goal.name, goal.params);
        } else {
            reachGoal(counterName, goal);
        }
    });
}

// eslint-disable-next-line complexity
function getServicePrefix(id) {
    switch (id) {
        case 'compute':
            return 'CMPT';
        case 'iam':
            return 'IAM';
        case 'vpc':
            return 'VPC';
        case 'storage':
            return 'STRG';
        case 'speechkit':
            return 'SK';
        case 'managed-clickhouse':
            return 'CH';
        case 'managed-mongodb':
            return 'MONGO';
        case 'managed-postgresql':
            return 'POSTGR';
        case 'managed-redis':
            return 'MR';
        case 'managed-mysql':
            return 'MMSQL';
        case 'managed-kubernetes':
            return 'MK';
        case 'translate':
            return 'TRSL';
        case 'instance-groups':
            return 'INSTGR';
        case 'load-balancer':
            return 'LB';
        case 'message-queue':
            return 'MQ';
        case 'datalens':
            return 'DL';
        case 'monitoring':
            return 'MNTRG';
        case 'data-proc':
            return 'DP';
        case 'kms':
            return 'KMS';
        case 'ydb':
            return 'YDB';
        case 'interconnect':
            return 'INTRCNCT';
    }

    return undefined;
}

function getMarketPlacePrefix(id) {
    return `product_${id}_`;
}

function goalGoToConsole(prefix) {
    return prefix && `${prefix}GOTOCONSOLE`;
}

function goalGoToForm(prefix) {
    return prefix && `${prefix}GOTOFORM`;
}

function goalGoToDocs(prefix) {
    return prefix && `${prefix}GOTODOCS`;
}

function goalFormSubmit(prefix) {
    return prefix && `${prefix}FORMSUBMIT`;
}

function goalEventFormSubmit(id) {
    return `event${id || 's'}_form_submit`;
}

function goalEventVideoAction(id, action) {
    return `event${id}_video_${action}`;
}

function goalCaseFormSubmit(id) {
    return `case${id ? `_${id}` : 's'}_form_submit`;
}

function goalSwitchLang(place) {
    return `SWITCH_LANG_${place}`;
}

export default {
    hit,
    params,
    reachGoal,
    reachGoals,
    Goal,
    getServicePrefix,
    getMarketPlacePrefix,
    goalGoToConsole,
    goalGoToForm,
    goalGoToDocs,
    goalFormSubmit,
    goalEventFormSubmit,
    goalEventVideoAction,
    goalCaseFormSubmit,
    goalSwitchLang,
};
