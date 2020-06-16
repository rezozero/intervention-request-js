export declare class InterventionRequest {
    /**
     * Source
     */
    src: string;
    /**
     * Alt attribute
     */
    alt: string;
    /**
     * Lazyload
     */
    lazy?: boolean;
    /**
     * Classes
     * Component additionnal classnames
     */
    classes?: string;
    /**
     * Strategy
     */
    strategy?: string;
    /**
     * Base URL
     */
    baseUrl?: string;
    /**
     * Source list
     */
    formats?: string;
    /**
     * Embed mode
     * Use <iframe> if true
     */
    embed: boolean;
    private formatsObject?;
    private component;
    componentWillRender(): void;
    render(): HTMLInterventionRequestElement;
}
