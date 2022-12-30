import {EnvironmentContext, JestEnvironmentConfig} from '@jest/environment';
import JsDomEnvironmetn from 'jest-environment-jsdom';

const matchMedia = (query: string) =>
    ({
        query,
        matches: false,
        addListener: function () {},
        removeListener: function () {},
    } as unknown as MediaQueryList);

class CustomEnvironment extends JsDomEnvironmetn {
    constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
        super(config, context);
        this.global.matchMedia = matchMedia;
    }
}

export default CustomEnvironment;
