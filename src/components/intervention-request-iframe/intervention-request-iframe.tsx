import { Component, Prop, Host, h, Element } from '@stencil/core'

/**
 * InterventionRequest Iframe
 * @description Iframe component
 * @author ravorona
 */
@Component({
    tag: 'intervention-request-iframe',
    shadow: true,
})
export class InterventionRequestIframe {
    /**
     * Component element reference
     */
    @Element()
    el: HTMLElement;

    /**
     * Source
     */
    @Prop()
    src!: string

    /**
     * Alt attribute
     */
    @Prop()
    alt: string

    /**
     * Width attribute
     */
    @Prop()
    width: number

    /**
     * Height attribute
     */
    @Prop()
    height: number

    /**
     * Strategy
     */
    @Prop()
    strategy: string

    /**
     * Base URL
     */
    @Prop()
    baseUrl?: string

    /**
     * Loading type
     * Native lazyloading. see https://caniuse.com/#feat=loading-lazy-attr
     *
     * auto: Default lazy-loading behavior of the browser, which is the same as not including the attribute.
     * lazy: Defer loading of the resource until it reaches a calculated distance from the viewport.
     * eager: Load the resource immediately, regardless of where it's located on the page.
     * @default auto
     */
    @Prop()
    loading: 'lazy' | 'eager' | 'auto'

    /**
     * Component render
     * Component lifecycle method
     * @return HTMLInterventionRequestIframeElement
     */
    render(): HTMLInterventionRequestIframeElement {
        return (
            <Host>
                <iframe
                    width={ this.width }
                    height={ this.height }
                    src={ this.src }
                    title={ this.alt }
                    frameborder="0"
                    loading={ this.loading } />
            </Host>
        )
    }
}
