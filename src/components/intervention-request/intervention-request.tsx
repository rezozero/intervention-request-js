import { Component, Prop, Host, h} from '@stencil/core'
import { InterventionRequestOptions } from '~/@types'

@Component({
    tag: 'intervention-request',
    styleUrl: 'intervention-request.css',
    shadow: true,
})

export class InterventionRequest {
    @Prop() src: string
    @Prop() alt: string
    @Prop() options?: InterventionRequestOptions

    protected baseUrl: string = 'http://intervention.local/assets'

    /**
     * Generate fullpath
     * @param media
     * @return media full path
     */
    protected path(media: string): string {
        return `${ this.baseUrl }/f1280x760/${ media }.webp`
    }

    /**
     * Component renderer
     */
    render(): HTMLElement {
        return (
            <Host>
                <slot name="before" />
                <picture>
                    <img src={ this.path(this.src) } alt={ this.alt } />
                </picture>
                <slot />
            </Host>
        )
    }

}
