/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { InterventionRequestOptions } from "~/@types";
export namespace Components {
    interface InterventionRequest {
        "alt": string;
        "options"?: InterventionRequestOptions;
        "src": string;
    }
}
declare global {
    interface HTMLInterventionRequestElement extends Components.InterventionRequest, HTMLStencilElement {
    }
    var HTMLInterventionRequestElement: {
        prototype: HTMLInterventionRequestElement;
        new (): HTMLInterventionRequestElement;
    };
    interface HTMLElementTagNameMap {
        "intervention-request": HTMLInterventionRequestElement;
    }
}
declare namespace LocalJSX {
    interface InterventionRequest {
        "alt"?: string;
        "options"?: InterventionRequestOptions;
        "src"?: string;
    }
    interface IntrinsicElements {
        "intervention-request": InterventionRequest;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "intervention-request": LocalJSX.InterventionRequest & JSXBase.HTMLAttributes<HTMLInterventionRequestElement>;
        }
    }
}
