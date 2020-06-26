import { Component, Prop, Host, h, Element, State, Event, EventEmitter, Watch } from '@stencil/core'
import strategies from '../../strategies/index'
import Strategy from '../../utils/strategy'
import { isWebp } from '../../utils/utils'
import { InterventionRequestFormat, InterventionRequestMedia } from '../../intervention-request'
import { InterventionRequestStrategyFormat } from '../../strategies'

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
     * Own properties
     */
    private strategyInstance?: Strategy
    private isWebp: boolean
    private nativeLoading: boolean
    private observer: IntersectionObserver

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
    media?: InterventionRequestMedia

    /**
     * Mime type
     */
    @Prop()
    mimeType?: string

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

    /**
     * Media loaded
     */
    @State()
    private loaded: boolean = false

    /**
     * Loading completed event emitter
     */
    @Event()
    private loadingCompleted: EventEmitter<boolean>

    @Watch('src')
    sourceHandler (): void {
        console.log('src changed', this.observer)
        this.resetMedia()
        this.initObserver()
    }

    /**
     * Component wiill load
     * Component lifecycle method
     * @return void
     */
    componentWillLoad(): void {
        this.strategyInstance = strategies[this.strategy]
        this.isWebp = isWebp(this.src)
        this.nativeLoading = ('loading' in HTMLImageElement.prototype) && !this.forceIo

        if (!this.strategyInstance && window.interventionRequestJS && window.interventionRequestJS.debug) {
            console.error('strategy error', `${this.strategy} strategy is missing`)
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
     * Load media
     * Toggle attribures
     */
    private resetMedia (): void {
        const elements = this.el.querySelectorAll('source, img')

        elements.forEach(
            (element: HTMLSourceElement|HTMLImageElement): void => {
                element.removeAttribute('src')
                element.removeAttribute('srcset')
            }
        )
    }

    /**
     * Media ready
     */
    public onReady (): void {
        this.loaded = true

        if (this.loadingCompleted) {
            this.loadingCompleted.emit(true)
        }
    }

    /**
     * On error
     */
    public onError (): void {}

    /**
     * Build picture tag
     * @return HTMLPictureElement
     */
    private buildPicture(): HTMLPictureElement {
        let mediaElements: Array<any> = []
        let fallbackSources!: string

        if (this.media && this.media.length) {
            /**
             * Loop thru formats
             * Define all <source>
             */
            mediaElements = this.media.map(
                (format: InterventionRequestFormat, formatIndex: number): Array<HTMLSourceElement|HTMLImageElement> => {
                    let srcset: Array<string> = []
                    let sources: Array<HTMLSourceElement|HTMLImageElement> = []

                    /**
                     * Ensure that format.srcset
                     * contains all required properties
                     */
                    format.srcset = format.srcset.filter(
                        (source: InterventionRequestStrategyFormat): boolean => {
                            return !!(source.format)
                        }
                    )

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
                            (source: InterventionRequestStrategyFormat, sourceIndex: number): string => {
                                if (formatIndex === this.media.length -1 && sourceIndex === format.srcset.length - 1) {
                                    fallbackSources = this.strategyInstance.formatPath(this.src, source, this.baseUrl)
                                }

                                return `${this.strategyInstance.formatPath(this.src, source, this.baseUrl, true)}`
                            }
                        )
                    }

                    if (srcset.length) {
                        /**
                         * Generate webp source
                         * for non webp
                         * and only if preferWebp is true
                         */
                        if (this.strategyInstance.webp && !this.isWebp) {
                            sources.push(
                                <source
                                    type={ 'image/webp' }
                                    media={ format.rule }
                                    data-srcset={ srcset.join(', ').replace(new RegExp(this.src, 'g'), `${this.src}.webp`) } />
                            )
                        }

                        /**
                         * Generate common source
                         * Regardless of media type
                         */
                        sources.push(
                            <source
                                type={ this.mimeType }
                                media={ format.rule }
                                data-srcset={ srcset.join(', ') } />
                        )

                        /**
                         * Generate fallback
                         */
                        if (fallbackSources) {
                            sources.push(
                                <img
                                    width={ this.width }
                                    height={ this.height }
                                    sizes={ format.rule }
                                    alt={ this.alt || this.src }
                                    loading={ this.loading }
                                    data-src={ fallbackSources }
                                    data-srcSet={ srcset.join(', ') }
                                    onLoad={ () => this.onReady() } />
                            )
                        }
                    }

                    return sources
                }
            )
        } else {
            const operations: InterventionRequestStrategyFormat = {
                format: {
                    width: this.width || window.innerWidth,
                    height: this.height || Math.floor(window.innerWidth * 3 / 4)
                }
            }

            if (window.interventionRequestJS) {
                operations.format = {
                    ...window.interventionRequestJS.mediaOptions,
                    ...operations.format
                }
            }

            fallbackSources = this.strategyInstance.formatPath(this.src, operations, this.baseUrl)

            /**
             * Original media
             * In case no formats provided
             */

            /**
             * Generate webp source
             * for non webp
             * and only if preferWebp is true
             */
            if (this.strategyInstance.webp && !this.isWebp) {
                mediaElements.push(
                    <source
                        type={ 'image/webp' }
                        data-srcset={ `${ fallbackSources }.webp` } />
                )
            }

            /**
             * Generate common source
             * Regardless of media type
             */
            mediaElements.push(
                <source
                    type={ this.mimeType }
                    data-srcset={ fallbackSources } />,
                <img
                    width={ this.width }
                    height={ this.height }
                    alt={ this.alt || this.src }
                    loading={ this.loading }
                    data-src={ fallbackSources }
                    onLoad={ this.onReady }
                    onError={ this.onError }/>
            )
        }

        return (
            <picture>
                { mediaElements }
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
            <Host class={{ loaded: this.loaded }}>
                { this.strategyInstance && this.buildPicture() }
            </Host>
        )
    }
}
