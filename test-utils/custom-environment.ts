import {EnvironmentContext, JestEnvironmentConfig} from '@jest/environment';
import JsDomEnvironmetn from 'jest-environment-jsdom';

const matchMedia = (query: string) =>
    ({
        media: query,
        matches: false,
        addEventListener: function () {},
        removeEventListener: function () {},
        addListener: function () {},
        removeListener: function () {},
    }) as unknown as MediaQueryList;

class CustomEnvironment extends JsDomEnvironmetn {
    constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
        super(config, context);
        this.global.matchMedia = matchMedia;
        this.global.HTMLMediaElement.prototype.pause = () => {};
        this.global.HTMLMediaElement.prototype.play = () => Promise.resolve();
    }
}

export default CustomEnvironment;
