import { InterventionRequestFormats } from '~/@types';
export declare class InterventionRequestIframe {
    /**
     * Image source
     */
    src: string;
    /**
     * Image alt attribute
     */
    alt: string;
    /**
     * Source list
     */
    formats?: InterventionRequestFormats;
    strategy: string;
    baseUrl: string;
    render(): HTMLInterventionRequestIframeElement;
}
