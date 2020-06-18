import { Component, Prop, Host, h, Element, State, Listen } from '@stencil/core'
import strategies from '../../strategies/index'
import Strategy from '../../utils/strategy'
import { isWebp, log } from '../../utils/utils'
import { InterventionRequestFormat, InterventionRequestFormats, InterventionRequestMediaFormat } from '../../intervention-request'

/**
 * InterventionRequest Picture
 * @description Picture component
 * @author ravorona
 */
@Component({
    tag: 'intervention-request-picture',
    styleUrl: 'intervention-request-picture.css',
    shadow: false,
})
export class InterventionRequestPicture {
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
    width?: number

    /**
     * Height attribute
     */
    @Prop()
    height?: number

    /**
     * Strategy
     */
    @Prop()
    strategy: string

    /**
     * Base URL
     */
    @Prop()
    baseUrl: string

    /**
     * Source list
     */
    @Prop()
    formats?: InterventionRequestFormats

    /**
     * Force intersection observer
     * for lazy load
     */
    @Prop()
    forceIo?: boolean

    /**
     * Loading type
     */
    @Prop()
    loading: 'lazy' | 'eager' | 'auto'

    @State()
    private loaded: boolean = false

    private strategyInstance: Strategy = strategies[this.strategy] as Strategy
    private isWebp: boolean = isWebp(this.src)
    private nativeLoading: boolean = ('loading' in HTMLImageElement.prototype) && !this.forceIo
    private observer?: IntersectionObserver

    /**
     * Component wiill load
     * Component lifecycle method
     * @return void
     */
    componentWillLoad(): void {
        if (!this.strategyInstance) {
            log('strategy error')
        }
    }

    /**
     * Component did load
     * Component lifecycle method
     * @return void
     */
    componentDidLoad(): void {
        if (this.nativeLoading || this.loading !== 'lazy') {
            this.loadMedia()
        } else {
            this.initObserver()
        }
    }

    /**
     * Init intersection observer
     */
    private initObserver (): void {
        this.observer = new IntersectionObserver((entries: Array<IntersectionObserverEntry>): void => this.onIntersect(entries))
        this.observer.observe(this.el)
    }

    /**
     * Intersection observer callback
     * @param entries
     */
    private onIntersect (entries: Array<IntersectionObserverEntry>): void {
        entries.forEach(
            (entry: IntersectionObserverEntry): void => {
                if (entry.isIntersecting) {
                    this.observer.disconnect()
                    this.loadMedia()
                }
            }
        )
    }

    /**
     * Load media
     * Toggle attribures
     */
    private loadMedia (): void {
        const elements = this.el.querySelectorAll('source, img')

        elements.forEach(
            (element: HTMLSourceElement|HTMLImageElement): void => {
                if (element.dataset.src) {
                    element.setAttribute('src', element.dataset.src)
                }

                if (element.dataset.srcset) {
                    element.setAttribute('srcset', element.dataset.srcset)
                }
            }
        )
    }

    /**
     * Media ready
     */
    public onReady (): void {
        this.loaded = true
    }

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
                                data-srcset={ srcset.join(',').replace(new RegExp(this.src, 'g'), `${this.src}.webp`) } />
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
                            data-srcset={ srcset.join(',') } />
                    )

                    /**
                     * Generate fallback
                     */
                    if (fallbackSources) {
                        sources.push(
                            <img
                                width={ this.width }
                                height={ this.height }
                                sizes={ format.sizes }
                                alt={ this.alt || this.src }
                                loading={ this.loading }
                                data-src={ fallbackSources }
                                data-srcSet={ srcset.join(',') }
                                onLoad={ () => this.onReady() } />
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
                <source
                    data-srcset={ `${this.strategyInstance.baseUrl}/${this.src}` } />,
                <img
                    width={ this.width }
                    height={ this.height }
                    alt={ this.alt || this.src }
                    loading={ this.loading }
                    data-src={ `${this.strategyInstance.baseUrl}/${this.src}` }
                    onLoad={ this.onReady } />
            )
        }

        return (
            <picture>
                { sources }
            </picture>
        )
    }

    @Listen('click', { capture: true })
    handleClick() {
        this.onReady()
    }

    /**
     * Component render
     * Component lifecycle method
     * @return HTMLInterventionRequestPictureElement
     */
    render(): HTMLInterventionRequestPictureElement {
        return (
            <Host class={{ loaded: this.loaded }}>
                { this.strategyInstance && this.buildPicture() }
            </Host>
        )
    }
}
