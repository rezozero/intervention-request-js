import { r as registerInstance, h, H as Host } from './index-15ad1946.js';

class InterventionRequestIframe {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("iframe", { src: this.src })));
    }
}

export { InterventionRequestIframe as intervention_request_iframe };
