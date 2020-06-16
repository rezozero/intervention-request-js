import { r as registerInstance, h, H as Host } from './index-15ad1946.js';

const interventionRequestPictureCss = ":host{display:block}";

class InterventionRequestPicture {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        var _a;
        /**
         * Strategy
         * @default default
         */
        this.strategy = window.interventionRequestJS.strategy || 'default';
        /**
         * Base URL
         * @default assets
         */
        this.baseUrl = window.interventionRequestJS.baseUrl || 'assets';
        /**
         * Default media options
         */
        this.defaultMediaOptions = {
            quality: 85,
            progressive: true,
            rule: '100vw'
        };
        this.isWebp = ((_a = this.src) === null || _a === void 0 ? void 0 : _a.split('.').pop().toLowerCase()) === 'webp';
    }
    path(media) {
        return `${this.baseUrl}/f1280x760/${media}.webp`;
    }
    buildSourceElement() {
        return document.createElement('source');
    }
    componentWillLoad() {
        console.group('*** picture will load ***');
        console.info('strategy:', this.strategy);
        console.info('source:', this.src);
        console.log('formats:', this.formats);
        console.groupEnd();
        /**
         * Override default media options
         * If global configuration is set
         */
        if (window.interventionRequestJS.defaultMediaOptions) {
            this.defaultMediaOptions = Object.assign(Object.assign({}, this.defaultMediaOptions), window.interventionRequestJS.defaultMediaOptions);
        }
    }
    componentWillRender() {
        if (this.formats && this.formats.length) {
            this.formats.forEach((format) => {
                if (format.srcset && format.srcset.length) {
                    format.srcset = format.srcset.map((source) => {
                        return Object.assign(Object.assign({}, this.defaultMediaOptions), source);
                    });
                }
            });
        }
    }
    render() {
        /*
        <source srcSet={this.path(this.src)} type={'image/webp'}/>
        <source srcSet={`${this.baseUrl}/f1280x760/${this.src}`}/>
        <img src={`${this.baseUrl}/f1280x760/${this.src}`} alt={this.alt}/>
        */
        return (h(Host, null, h("picture", null)));
    }
}
InterventionRequestPicture.style = interventionRequestPictureCss;

export { InterventionRequestPicture as intervention_request_picture };
