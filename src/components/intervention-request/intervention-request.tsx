import { Element, Component, Prop, Host, h, Listen, State } from '@stencil/core'
import { InterventionRequestFormat, InterventionRequestMedia } from '../../intervention-request'
import { InterventionRequestStrategyFormat } from '../../strategies'
import { extractFileExtension } from '../../utils/utils'

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
     * Own properties
     */
    private component: string

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
     * Base URL
     */
    @Prop()
    baseUrl?: string

    /**
     * Media formats
     */
    @Prop()
    formats?: string

    /**
     * Mime type
     */
    @Prop()
    mimeType?: string

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
     * Disable url processing
     * source is directly applied as it is in attributes
     */
    @Prop()
    noProcess?: boolean

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

    @State()
    private classnames: string = ''


    /**
     * Loading complete listener
     */
    @Listen('loadingCompleted')
    handleLoadingCompleted (): void {
        this.classnames += ' loaded'
    }

    private media?: InterventionRequestMedia

    /**
     * Component will load
     * Component lifecycle method
     * @return void
     */
    componentWillLoad(): void {
        const formats = this.formats ? JSON.parse(this.formats) : false

        if (formats) {
            /**
             * Extract the media property
             * or build one if it doesn't exist
             */
            if (formats.media) {
                this.media = formats.media
            } else {
                const srcset = {
                    format: {
                        ...formats
                    }
                }

                this.media = [ { srcset: [ srcset ] } ]
            }

            /**
             * Use formats dimensions
             * for width & height
             */
            if (formats.width) {
                this.width = formats.width
            }

            if (formats.height) {
                this.height = formats.height
            }
        }

        if (window.interventionRequestJS && window.interventionRequestJS.debug) {
            console.groupCollapsed('%cIntervention Request', 'font-size: 10px; font-weight: normal; background: #673ab7; color: #fff; padding: 2px 4px; border-radius: 3px')

            if (this.src) {
                console.info('source: %s', this.src)
            } else {
                console.error('src attribute is required')
            }

            console.info('strategy: %s', this.strategy || 'default')

            if (this.media) {

                console.log('media', this.media)

                if (this.media) {
                    this.media.forEach(
                        (media: InterventionRequestFormat): void => {
                            if (media.srcset) {
                                media.srcset.forEach(
                                    (srcset: InterventionRequestStrategyFormat): void => {
                                        if (!srcset.format) {
                                            console.warn('wrong media configuration: missing srcset.format property')
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }

            console.log(this.el)
            console.groupEnd()
        }

        if (this.src) {
            if (this.mimeType) {
                switch (this.mimeType) {
                    case 'image/webp':
                    case 'image/jpeg':
                    case 'image/png':
                    case 'image/gif':
                    case 'image/bmp':
                        this.component = 'intervention-request-picture'
                        break;

                    case 'image/svg':
                    case 'image/svg+xml':
                        this.component = 'intervention-request-svg'
                        break;

                    default:
                        this.component = 'intervention-request-iframe'
                        break;
                }
            } else {
                switch (extractFileExtension(this.src)) {
                    case 'webp':
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                    case 'gif':
                    case 'bmp':
                        this.component = 'intervention-request-picture'
                        break;

                    case 'svg':
                        this.component = 'intervention-request-svg'
                        break;

                    default:
                        this.component = 'intervention-request-iframe'
                        break;
                }
            }
        }

        if (this.noProcess) {
            this.strategy = 'noprocess'
        }

        this.component = this.embed ? 'intervention-request-iframe' : this.component
    }

    /**
     * Component will render
     * Component lifecycle method
     * @return void
     */
    componentWillRender (): void {
        /**
         * Set defaults
         */
        this.strategy = this.strategy || (window.interventionRequestJS && window.interventionRequestJS.strategy ? window.interventionRequestJS.strategy : 'default')
        this.baseUrl = this.baseUrl || (window.interventionRequestJS && window.interventionRequestJS.baseUrl ? window.interventionRequestJS.baseUrl : undefined)
        this.forceIo = this.forceIo || (window.interventionRequestJS && window.interventionRequestJS.forceIo ? window.interventionRequestJS.forceIo : undefined)
        this.loading = this.loading || (window.interventionRequestJS && window.interventionRequestJS.loading ? window.interventionRequestJS.loading : 'auto')
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
                        media={ this.media }
                        mime-type={ this.mimeType }
                        no-process={ this.noProcess }/>
                }
                <slot />
            </Host>
        )
    }
}
