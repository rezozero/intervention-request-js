import { Element, Component, Prop, Host, h } from '@stencil/core'

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
    @Element() el: HTMLElement;

    /**
     * Source
     */
    @Prop() src!: string

    /**
     * Alt attribute
     */
    @Prop() alt: string

    /**
     * Lazyload
     */
    @Prop() lazy?: boolean

    /**
     * Component additionnal classnames
     */
    @Prop() classes?: string

    /**
     * Strategy
     */
    @Prop() strategy?: string

    /**
     * Base URL
     */
    @Prop() baseUrl?: string

    /**
     * Source list
     */
    @Prop() formats?: string

    /**
     * Embed mode - Use iframe if true
     */
    @Prop() embed: boolean = false


    private formatsObject?: InterventionRequestFormats
    private component: string = this.embed ? 'intervention-request-iframe' : 'intervention-request-picture'

    /**
     * Component will render
     * Component lifecycle method
     * @return void
     */
    componentWillRender (): void {
        if (this.formats) {
            const formats = JSON.parse(this.formats)

            /**
             * Convert formats to array if needed
             * for a consistent processing
             */
            this.formatsObject = formats.length ? formats : new Array(formats)
        }
    }

    /**
     * Component render
     * Component lifecycle method
     * @return HTMLInterventionRequestElement
     */
    render(): HTMLInterventionRequestElement {
        return (
            <Host class={ this.classes?.split(',').join(' ') }>
                <slot name="before" />
                { this.src &&
                    <this.component
                        src={ this.src }
                        alt={ this.alt }
                        formats={ this.formatsObject }
                        strategy={ this.strategy }
                        baseUrl={ this.baseUrl }
                    />
                }
                <slot />
            </Host>
        )
    }
}
