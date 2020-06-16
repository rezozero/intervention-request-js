import { InterventionRequestFormats } from '~/@types';
export declare class InterventionRequestPicture {
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
    /**
     * Strategy
     * @default default
     */
    strategy: string;
    /**
     * Base URL
     * @default assets
     */
    baseUrl: string;
    /**
     * Default media options
     */
    private defaultMediaOptions;
    private isWebp;
    private path;
    private buildSourceElement;
    componentWillLoad(): void;
    componentWillRender(): void;
    render(): HTMLInterventionRequestPictureElement;
}
