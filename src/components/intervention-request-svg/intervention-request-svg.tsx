import { Component, Host, h, Element, Prop } from '@stencil/core'

@Component({
    tag: 'intervention-request-svg',
    styleUrl: 'intervention-request-svg.css',
    shadow: true,
})
export class InterventionRequestSvg {
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
     * Base URL
     */
    @Prop()
    baseUrl?: string

    /**
     * Component render
     * Component lifecycle method
     * @return HTMLInterventionRequestSvgElement
     */
    render(): HTMLInterventionRequestSvgElement {
        const fileUploadFolder = window.interventionRequestJS && window.interventionRequestJS.fileuploadFolder ? window.interventionRequestJS.fileuploadFolder : 'files'

        return (
            <Host>
                <object
                    type="image/svg+xml"
                    width={ this.width || 32 }
                    height={ this.height || 32 }
                    data={ `${fileUploadFolder}/${this.src}` }
                    title={ this.alt } />
            </Host>
        );
    }

}
