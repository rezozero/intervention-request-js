/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { InterventionRequestMedia } from "./intervention-request";
export namespace Components {
    interface InterventionRequest {
        /**
          * Alt attribute
         */
        "alt": string;
        /**
          * Base URL
         */
        "baseUrl"?: string;
        /**
          * Embed mode use iframe if true
         */
        "embed"?: boolean;
        /**
          * Force intersection observer for lazy load
         */
        "forceIo"?: boolean;
        /**
          * Media formats
         */
        "formats"?: string;
        /**
          * Height attribute
         */
        "height": number;
        /**
          * Native lazyloading see https://caniuse.com/#feat=loading-lazy-attr see https://web.dev/native-lazy-loading/  auto: Default lazy-loading behavior of the browser, which is the same as not including the attribute. lazy: Defer loading of the resource until it reaches a calculated distance from the viewport. eager: Load the resource immediately, regardless of where it's located on the page.
          * @default auto
         */
        "loading"?: 'lazy' | 'eager' | 'auto';
        /**
          * Mime type
         */
        "mimeType"?: string;
        /**
          * Disable url processing. Source is directly applied as it is in attributes
         */
        "noProcess"?: boolean;
        /**
          * Source
         */
        "src": string;
        /**
          * Strategy
         */
        "strategy"?: string;
        /**
          * Width attribute
         */
        "width": number;
    }
    interface InterventionRequestIframe {
        /**
          * Alt attribute
         */
        "alt": string;
        /**
          * Base URL
         */
        "baseUrl"?: string;
        /**
          * Height attribute
         */
        "height": number;
        /**
          * Loading type Native lazyloading. see https://caniuse.com/#feat=loading-lazy-attr  auto: Default lazy-loading behavior of the browser, which is the same as not including the attribute. lazy: Defer loading of the resource until it reaches a calculated distance from the viewport. eager: Load the resource immediately, regardless of where it's located on the page.
          * @default auto
         */
        "loading": 'lazy' | 'eager' | 'auto';
        /**
          * Source
         */
        "src": string;
        /**
          * Width attribute
         */
        "width": number;
    }
    interface InterventionRequestPicture {
        /**
          * Alt attribute
         */
        "alt": string;
        /**
          * Base URL
         */
        "baseUrl": string;
        /**
          * Crop attribute
         */
        "crop"?: string;
        /**
          * Fit attribute
         */
        "fit"?: string;
        /**
          * Force intersection observer for lazy load
         */
        "forceIo"?: boolean;
        /**
          * Height attribute
         */
        "height"?: number;
        /**
          * Loading type
         */
        "loading": 'lazy' | 'eager' | 'auto';
        /**
          * Source list
         */
        "media"?: InterventionRequestMedia;
        /**
          * Mime type
         */
        "mimeType"?: string;
        /**
          * Source
         */
        "src": string;
        /**
          * Strategy
         */
        "strategy": string;
        /**
          * Width attribute
         */
        "width"?: number;
    }
    interface InterventionRequestSvg {
        /**
          * Alt attribute
         */
        "alt": string;
        /**
          * Base URL
         */
        "baseUrl"?: string;
        /**
          * Height attribute
         */
        "height": number;
        /**
          * Source
         */
        "src": string;
        /**
          * Width attribute
         */
        "width": number;
    }
}
declare global {
    interface HTMLInterventionRequestElement extends Components.InterventionRequest, HTMLStencilElement {
    }
    var HTMLInterventionRequestElement: {
        prototype: HTMLInterventionRequestElement;
        new (): HTMLInterventionRequestElement;
    };
    interface HTMLInterventionRequestIframeElement extends Components.InterventionRequestIframe, HTMLStencilElement {
    }
    var HTMLInterventionRequestIframeElement: {
        prototype: HTMLInterventionRequestIframeElement;
        new (): HTMLInterventionRequestIframeElement;
    };
    interface HTMLInterventionRequestPictureElement extends Components.InterventionRequestPicture, HTMLStencilElement {
    }
    var HTMLInterventionRequestPictureElement: {
        prototype: HTMLInterventionRequestPictureElement;
        new (): HTMLInterventionRequestPictureElement;
    };
    interface HTMLInterventionRequestSvgElement extends Components.InterventionRequestSvg, HTMLStencilElement {
    }
    var HTMLInterventionRequestSvgElement: {
        prototype: HTMLInterventionRequestSvgElement;
        new (): HTMLInterventionRequestSvgElement;
    };
    interface HTMLElementTagNameMap {
        "intervention-request": HTMLInterventionRequestElement;
        "intervention-request-iframe": HTMLInterventionRequestIframeElement;
        "intervention-request-picture": HTMLInterventionRequestPictureElement;
        "intervention-request-svg": HTMLInterventionRequestSvgElement;
    }
}
declare namespace LocalJSX {
    interface InterventionRequest {
        /**
          * Alt attribute
         */
        "alt"?: string;
        /**
          * Base URL
         */
        "baseUrl"?: string;
        /**
          * Embed mode use iframe if true
         */
        "embed"?: boolean;
        /**
          * Force intersection observer for lazy load
         */
        "forceIo"?: boolean;
        /**
          * Media formats
         */
        "formats"?: string;
        /**
          * Height attribute
         */
        "height"?: number;
        /**
          * Native lazyloading see https://caniuse.com/#feat=loading-lazy-attr see https://web.dev/native-lazy-loading/  auto: Default lazy-loading behavior of the browser, which is the same as not including the attribute. lazy: Defer loading of the resource until it reaches a calculated distance from the viewport. eager: Load the resource immediately, regardless of where it's located on the page.
          * @default auto
         */
        "loading"?: 'lazy' | 'eager' | 'auto';
        /**
          * Mime type
         */
        "mimeType"?: string;
        /**
          * Disable url processing. Source is directly applied as it is in attributes
         */
        "noProcess"?: boolean;
        /**
          * Source
         */
        "src": string;
        /**
          * Strategy
         */
        "strategy"?: string;
        /**
          * Width attribute
         */
        "width"?: number;
    }
    interface InterventionRequestIframe {
        /**
          * Alt attribute
         */
        "alt"?: string;
        /**
          * Base URL
         */
        "baseUrl"?: string;
        /**
          * Height attribute
         */
        "height"?: number;
        /**
          * Loading type Native lazyloading. see https://caniuse.com/#feat=loading-lazy-attr  auto: Default lazy-loading behavior of the browser, which is the same as not including the attribute. lazy: Defer loading of the resource until it reaches a calculated distance from the viewport. eager: Load the resource immediately, regardless of where it's located on the page.
          * @default auto
         */
        "loading"?: 'lazy' | 'eager' | 'auto';
        /**
          * Source
         */
        "src": string;
        /**
          * Width attribute
         */
        "width"?: number;
    }
    interface InterventionRequestPicture {
        /**
          * Alt attribute
         */
        "alt"?: string;
        /**
          * Base URL
         */
        "baseUrl"?: string;
        /**
          * Crop attribute
         */
        "crop"?: string;
        /**
          * Fit attribute
         */
        "fit"?: string;
        /**
          * Force intersection observer for lazy load
         */
        "forceIo"?: boolean;
        /**
          * Height attribute
         */
        "height"?: number;
        /**
          * Loading type
         */
        "loading"?: 'lazy' | 'eager' | 'auto';
        /**
          * Source list
         */
        "media"?: InterventionRequestMedia;
        /**
          * Mime type
         */
        "mimeType"?: string;
        /**
          * Loading completed event emitter
         */
        "onLoadingCompleted"?: (event: CustomEvent<boolean>) => void;
        /**
          * Source
         */
        "src": string;
        /**
          * Strategy
         */
        "strategy"?: string;
        /**
          * Width attribute
         */
        "width"?: number;
    }
    interface InterventionRequestSvg {
        /**
          * Alt attribute
         */
        "alt"?: string;
        /**
          * Base URL
         */
        "baseUrl"?: string;
        /**
          * Height attribute
         */
        "height"?: number;
        /**
          * Source
         */
        "src": string;
        /**
          * Width attribute
         */
        "width"?: number;
    }
    interface IntrinsicElements {
        "intervention-request": InterventionRequest;
        "intervention-request-iframe": InterventionRequestIframe;
        "intervention-request-picture": InterventionRequestPicture;
        "intervention-request-svg": InterventionRequestSvg;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "intervention-request": LocalJSX.InterventionRequest & JSXBase.HTMLAttributes<HTMLInterventionRequestElement>;
            "intervention-request-iframe": LocalJSX.InterventionRequestIframe & JSXBase.HTMLAttributes<HTMLInterventionRequestIframeElement>;
            "intervention-request-picture": LocalJSX.InterventionRequestPicture & JSXBase.HTMLAttributes<HTMLInterventionRequestPictureElement>;
            "intervention-request-svg": LocalJSX.InterventionRequestSvg & JSXBase.HTMLAttributes<HTMLInterventionRequestSvgElement>;
        }
    }
}
