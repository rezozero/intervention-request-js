import { Component, Prop, Host, h } from '@stencil/core'
import { InterventionRequestFormats } from '~/@types'

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

    @Prop() strategy: string
    @Prop() baseUrl: string

    render(): HTMLInterventionRequestIframeElement {
        return (
            <Host>
                <iframe src={ this.src } />
            </Host>
        );
    }
}
