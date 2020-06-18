import { Element, Component, Prop, Host, h } from '@stencil/core'
import { log } from '../../utils/utils'
import { InterventionRequestFormats } from '../../intervention-request'

/**
 * InterventionRequest
 * @description Wrapper component
 * @author ravorona
 */
@Component({
    tag: 'intervention-request',
    styleUrl: 'intervention-request.css',
    shadow: true,
})
export class InterventionRequest {
    /**
     * Component element reference
     */
    @Element()
    el: HTMLElement

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
     * Component additionnal classnames
     */
    @Prop()
    classes?: string

    /**
     * Base URL
     */
    @Prop()
    baseUrl?: string

    /**
     * Source list
     */
    @Prop()
    formats?: string

    /**
     * Embed mode
     * use iframe if true
     */
    @Prop()
    embed?: boolean

    /**
     * Strategy
     */
    @Prop()
    strategy?: string

    /**
     * Force intersection observer
     * for lazy load
     */
    @Prop()
    forceIo?: boolean

    /**
     * Loading type
     * Native lazyloading.
     * see https://caniuse.com/#feat=loading-lazy-attr
     * see https://web.dev/native-lazy-loading/
     *
     * auto: Default lazy-loading behavior of the browser, which is the same as not including the attribute.
     * lazy: Defer loading of the resource until it reaches a calculated distance from the viewport.
     * eager: Load the resource immediately, regardless of where it's located on the page.
     * @default auto
     */
    @Prop()
    loading?: 'lazy' | 'eager' | 'auto'


    private formatsObject?: InterventionRequestFormats
    private component: string = this.embed ? 'intervention-request-iframe' : 'intervention-request-picture'
    private classnames: string = this.classes?.split(',').join(' ')

    /**
     * Component wiill load
     * Component lifecycle method
     * @return void
     */
    componentWillLoad(): void {
        if (!this.src) {
            log('src is required')
        }
    }

    /**
     * Component will render
     * Component lifecycle method
     * @return void
     */
    componentWillRender (): void {
        /**
         * Convert formats to array if needed
         * for a consistent processing
         */
        if (this.formats) {
            const formats = JSON.parse(this.formats)

            this.formatsObject = formats.length ? formats : new Array(formats)
        }

        /**
         * Set defaults
         */
        this.strategy = this.strategy || (window.interventionRequestJS ? window.interventionRequestJS.strategy : 'default')
        this.baseUrl = this.baseUrl || (window.interventionRequestJS ? window.interventionRequestJS.baseUrl : undefined)
        this.forceIo = this.forceIo || (window.interventionRequestJS ? window.interventionRequestJS.forceIo : undefined)
        this.loading = this.loading || (window.interventionRequestJS ? window.interventionRequestJS.loading : 'auto')
    }

    /**
     * Component render
     * Component lifecycle method
     * @return HTMLInterventionRequestElement
     */
    render(): HTMLInterventionRequestElement {
        return (
            <Host class={ this.classnames }>
                <slot name="before" />
                { this.src &&
                    <this.component
                        width={ this.width }
                        height={ this.height }
                        src={ this.src }
                        alt={ this.alt }
                        strategy={ this.strategy }
                        baseUrl={ this.baseUrl }
                        force-io={ this.forceIo }
                        loading={ this.loading }
                        formats={ this.formatsObject } />
                }
                <slot />
            </Host>
        )
    }
}
