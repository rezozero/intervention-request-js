import { Component, Prop, Host, h } from '@stencil/core'
import { InterventionRequestMediaFormat, InterventionRequestFormats, InterventionRequestFormat } from '~/@types'

@Component({
    tag: 'intervention-request-picture',
    styleUrl: 'intervention-request-picture.css',
    shadow: true,
})

export class InterventionRequestPicture {
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
     * Strategy
     * @default default
     */
    @Prop() strategy: string = window.interventionRequestJS.strategy || 'default'

    /**
     * Base URL
     * @default assets
     */
    @Prop() baseUrl: string = window.interventionRequestJS.baseUrl || 'assets'

    /**
     * Default media options
     */
    private defaultMediaOptions: InterventionRequestMediaFormat = {
        quality: 85,
        progressive: true,
        rule: '100vw'
    }

    private isWebp: boolean = this.src?.split('.').pop().toLowerCase() === 'webp'

    private path(media: string): string {
        return `${ this.baseUrl }/f1280x760/${ media }.webp`
    }

    private buildSourceElement(): HTMLSourceElement {
        return document.createElement('source')
    }

    componentWillLoad(): void {
        console.group('*** picture will load ***')
        console.info('strategy:', this.strategy)
        console.info('source:', this.src)
        console.log('formats:', this.formats)
        console.groupEnd()

        /**
         * Override default media options
         * If global configuration is set
         */
        if (window.interventionRequestJS.defaultMediaOptions) {
            this.defaultMediaOptions = {
                ...this.defaultMediaOptions,
                ...window.interventionRequestJS.defaultMediaOptions
            }
        }
    }

    componentWillRender(): void {
        if (this.formats && this.formats.length) {
            this.formats.forEach(
                (format: InterventionRequestFormat): void => {
                    if (format.srcset && format.srcset.length) {
                        format.srcset = format.srcset.map(
                            (source: InterventionRequestMediaFormat): InterventionRequestMediaFormat => {
                                return {
                                    ...this.defaultMediaOptions,
                                    ...source
                                }
                            }
                        )
                    }
                }
            )
        }
    }

    render(): HTMLInterventionRequestPictureElement {
        /*
        <source srcSet={this.path(this.src)} type={'image/webp'}/>
        <source srcSet={`${this.baseUrl}/f1280x760/${this.src}`}/>
        <img src={`${this.baseUrl}/f1280x760/${this.src}`} alt={this.alt}/>
        */
        return (
            <Host>
                <picture>

                </picture>
            </Host>
        );
    }
}
