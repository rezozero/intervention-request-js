import { Component, Prop, Host, h } from '@stencil/core'

/**
 * InterventionRequest Iframe
 * @description Iframe component
 * @author ravorona
 *
 * @todo fill attributes
 */
@Component({
    tag: 'intervention-request-iframe',
    shadow: true,
})
export class InterventionRequestIframe {
    /**
     * Image source
     */
    @Prop() src!: string

    /**
     * Image alt attribute
     */
    @Prop() alt: string

    /**
     * Source list
     */
    @Prop() formats?: InterventionRequestFormats

    /**
     * Component render
     * Component lifecycle method
     * @return HTMLInterventionRequestIframeElement
     */
    render(): HTMLInterventionRequestIframeElement {
        return (
            <Host>
                <iframe src={ this.src } />
            </Host>
        );
    }
}
