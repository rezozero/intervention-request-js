import { Component, Prop, Host, h } from '@stencil/core'
import strategies from '~/strategies/index'
import Strategy from '~/utils/strategy'
import { isWebp } from '~/utils/utils'

/**
 * InterventionRequest Picture
 * @description Picture component
 * @author ravorona
 *
 * @todo lazyloading
 */
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
    @Prop() baseUrl?: string


    /**
     * Lazy load
     * @default true
     */
    @Prop() lazy?: boolean = window.interventionRequestJS.lazy

    private strategyInstance: Strategy = strategies[this.strategy] as Strategy
    private isWebp: boolean = isWebp(this.src)

    /**
     * Component wiill load
     * Component lifecycle method
     * @return void
     */
    componentWillLoad(): void {}

    /**
     * Build picture tag
     * @return HTMLPictureElement
     */
    private buildPicture(): HTMLPictureElement {
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
                                if (formatIndex === this.formats.length -1 && sourceIndex === format.srcset.length - 1) {
                                    fallbackSources = this.strategyInstance.formatPath(this.src, source, this.baseUrl)
                                }

                                return `${this.strategyInstance.formatPath(this.src, source, this.baseUrl, true)}`
                            }
                        )
                    }

                    /**
                     * Generate webp source
                     * for non webp
                     * and only if preferWebp is true
                     */
                    if (this.strategyInstance.webp && !this.isWebp) {
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
        } else {
            /**
             * Original media
             * In case no formats provided
             */
            sources.push(
                <source srcSet={ `${this.strategyInstance.baseUrl}/${this.src}` } />,
                <img src={ `${this.strategyInstance.baseUrl}/${this.src}` } alt={ this.alt } />
            )
        }

        return (
            <picture>
                { sources }
            </picture>
        )
    }

    /**
     * Component render
     * Component lifecycle method
     * @return HTMLInterventionRequestPictureElement
     */
    render(): HTMLInterventionRequestPictureElement {
        return (
            <Host>
                { this.buildPicture() }
            </Host>
        );
    }
}
