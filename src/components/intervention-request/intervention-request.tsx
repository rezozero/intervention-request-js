import { Component, Prop, Host, h } from '@stencil/core'
import { InterventionRequestFormats } from '~/@types'

@Component({
    tag: 'intervention-request',
    styleUrl: 'intervention-request.css',
    shadow: true,
})

export class InterventionRequest {
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
     * Classes
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
     * Embed mode
     * Use <iframe> if true
     */
    @Prop() embed: boolean = false

    private formatsObject?: InterventionRequestFormats

    private component: string = this.embed ? 'intervention-request-iframe' : 'intervention-request-picture'

    componentWillRender (): void {
        if (this.formats) {
            const formats = JSON.parse(this.formats)

            this.formatsObject = formats.length ? formats : new Array(formats)
        }
    }

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
