import { r as registerInstance, h, H as Host } from './index-15ad1946.js';

const interventionRequestCss = ":host{display:block}";

class InterventionRequest {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Embed mode
         * Use <iframe> if true
         */
        this.embed = false;
        this.component = this.embed ? 'intervention-request-iframe' : 'intervention-request-picture';
    }
    componentWillRender() {
        if (this.formats) {
            const formats = JSON.parse(this.formats);
            this.formatsObject = formats.length ? formats : new Array(formats);
        }
    }
    render() {
        var _a;
        return (h(Host, { class: (_a = this.classes) === null || _a === void 0 ? void 0 : _a.split(',').join(' ') }, h("slot", { name: "before" }), this.src &&
            h(this.component, { src: this.src, alt: this.alt, formats: this.formatsObject, strategy: this.strategy, baseUrl: this.baseUrl }), h("slot", null)));
    }
}
InterventionRequest.style = interventionRequestCss;

export { InterventionRequest as intervention_request };
