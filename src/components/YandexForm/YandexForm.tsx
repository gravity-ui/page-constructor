import React, {createRef} from 'react';

import {HEADER_HEIGHT} from '../constants';
import {LocaleContextProps} from '../../context/localeContext';

export const YA_FORMS_URL = 'https://forms.yandex.ru';
const CONTAINER_ID = 'yandex-form-container';

export interface YandexFormProps {
    id: number | string;
    containerId?: string;
    theme?: string;
    className?: string;
    locale?: LocaleContextProps;
    isMobile?: boolean;
    headerHeight?: number;

    onSubmit?: () => void;
    onLoad?: () => void;
}

export default class YandexForm extends React.Component<YandexFormProps> {
    formContainerRef = createRef<HTMLDivElement>();
    iframe: HTMLIFrameElement | null = null;

    componentDidMount() {
        this.addIframe();

        // Crunch for mobile chrome in lite mode
        // https://support.google.com/chrome/answer/2392284?co=GENIE.Platform%3DAndroid&oco=1
        setTimeout(() => this.props.onLoad?.(), 1000);
    }

    componentDidUpdate(prevProps: YandexFormProps) {
        if (this.props.id !== prevProps.id) {
            this.addIframe();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.handleMessage);
    }

    render() {
        return <div ref={this.formContainerRef} className={this.props.className} />;
    }

    private addIframe() {
        const container = this.formContainerRef.current;

        if (container) {
            this.iframe = this.getFormIframe(container);
            window.addEventListener('message', this.handleMessage);
        }
    }

    private getFormIframe(container: HTMLDivElement) {
        const {id, locale, theme, isMobile, containerId = CONTAINER_ID} = this.props;

        const queryParams = new URLSearchParams(location.search);
        const url = location.origin + location.pathname;

        queryParams.set('url', url);
        queryParams.set('iframe', '1');

        if (locale?.lang) {
            queryParams.set('lang', locale.lang);
        }

        queryParams.set('theme', theme || 'cloud-www');

        if (isMobile) {
            queryParams.set('media-type', 'mobile');
        }

        const src = `${YA_FORMS_URL}/surveys/${id}/?${queryParams}`;

        let iframe = document.getElementById(containerId) as HTMLIFrameElement | null;

        if (iframe) {
            iframe.src = src;
        } else {
            iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.id = containerId;
            iframe.name = `form${id}`;
            iframe.frameBorder = '0';
            iframe.scrolling = 'no';
            iframe.width = '100%';
            container.appendChild(iframe);
        }

        return iframe;
    }

    private handleSubmit = () => {
        const {headerHeight = HEADER_HEIGHT, onSubmit} = this.props;

        if (this.formContainerRef && this.formContainerRef.current) {
            const {top} = this.formContainerRef.current.getBoundingClientRect();
            window.scrollBy(0, top - headerHeight);
        }

        if (onSubmit) {
            onSubmit();
        }
    };

    private handleMessage = ({origin, data}: MessageEvent) => {
        if (origin !== YA_FORMS_URL) {
            return;
        }

        try {
            const parsed = JSON.parse(data);
            const height = parsed['iframe-height'];
            const {message, name} = parsed;
            if (name !== `form${this.props.id}`) {
                return;
            }

            if (this.iframe && height && !message) {
                this.iframe.height = `${height}px`;
                this.props.onLoad?.();
            }

            if (message === 'sent') {
                this.handleSubmit();
            }
        } catch (error) {
            return;
        }
    };
}
