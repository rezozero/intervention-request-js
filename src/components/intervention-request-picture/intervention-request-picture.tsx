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
        progressive: true,
        rule: '100vw'
    }

    private isWebp: boolean = this.src?.split('.').pop().toLowerCase() === 'webp'

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

    private buildPicture(): HTMLPictureElement {
        /**
         * @todo retrieve ampersand & preferwebp from selected strategy
         */
        const ampersand = '-'
        const preferWebp = true
        let sources: Array<any> = []

        if (this.formats && this.formats.length) {
            /**
             * Loop thru formats
             * Define all <source>
             */
            sources = this.formats.map(
                (format: InterventionRequestFormat, formatIndex: number): Array<HTMLSourceElement> => {
                    let srcset: Array<string> = []
                    let sources: Array<HTMLSourceElement> = []
                    let fallbackSources!: string

                    /**
                     * Generate srcset
                     * foreach srcset rules
                     */
                    if (format.srcset && format.srcset.length) {
                        /**
                         * Loop thru srcset
                         * Define all srcset for responsive behavior
                         */
                        srcset = format.srcset.map(
                            (source: InterventionRequestMediaFormat, sourceIndex: number): string => {
                                let operations = []

                                /**
                                 * Applying default media options
                                 */
                                source = {
                                    ...this.defaultMediaOptions,
                                    ...source
                                }

                                /**
                                 * Build image operations
                                 * @todo fill w/ all available operations
                                 * @todo set params from selected strategy
                                 */
                                if (source.fit) {
                                    operations.push(`f${source.fit}`)
                                }

                                if (source.quality) {
                                    operations.push(`q${source.quality}`)
                                }

                                if (source.progressive) {
                                    operations.push(`p${source.progressive ? 1 : 0}`)
                                }

                                if (formatIndex === this.formats.length -1 && sourceIndex === format.srcset.length - 1) {
                                    fallbackSources = `${this.baseUrl}/${operations.join(ampersand)}/${this.src}`
                                }

                                return `${this.baseUrl}/${operations.join(ampersand)}/${this.src} ${source.rule}`
                            }
                        )
                    }

                    /**
                     * Generate webp source
                     * for non webp
                     * and only if preferWebp is true
                     */
                    if (preferWebp && !this.isWebp) {
                        sources.push(
                            <source
                                type={ 'image/webp' }
                                media={ format.media }
                                sizes={ format.sizes }
                                srcSet={ srcset.join(',').replace(new RegExp(this.src, 'g'), `${this.src}.webp`) } />
                        )
                    }

                    /**
                     * Generate common source
                     * Regardless of media type
                     */
                    sources.push(
                        <source
                            media={ format.media }
                            sizes={ format.sizes }
                            srcSet={ srcset.join(',') } />
                    )

                    /**
                     * Generate fallback
                     */
                    if (fallbackSources) {
                        sources.push(
                            <img
                                src={ fallbackSources }
                                sizes={ format.sizes }
                                srcSet={ srcset.join(',') }
                                alt={ this.alt } />
                        )
                    }

                    return sources
                }
            )
        }

        return (
            <picture>
                { sources }
            </picture>
        )
    }

    render(): HTMLInterventionRequestPictureElement {
        return (
            <Host>
                { this.buildPicture() }
            </Host>
        );
    }
}
