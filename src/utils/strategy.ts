/**
 * Strategy
 * @description Build providers default strategy
 * @author ravorona
 */
import { InterventionRequestOperations, InterventionRequestStrategy } from '../strategies'
import { InterventionRequestMediaFormat } from '../intervention-request'

export default class Strategy implements InterventionRequestStrategy {
    /**
     * Strategy defaults
     */
    public name: string
    public baseUrl: string
    public ampersand: string = '-'
    public separator: string = ''
    public webp: boolean = false
    public operations: InterventionRequestOperations = {
        align: 'a',
        fit: 'f',
        flip: 'm',
        crop: 'c',
        width: 'w',
        height: 'h',
        background: 'b',
        greyscale: 'g',
        blur: 'l',
        quality: 'q',
        progressive: 'p',
        interlace: 'i',
        sharpen: 's',
        contrast: 'k'
    }

    /**
     * Default media options
     * @return InterventionRequestMediaFormat
     */
    private readonly defaultMediaOptions: InterventionRequestMediaFormat = {
        rule: '100vw'
    }

    /**
     * Constructor
     * @param options
     */
    constructor(options: InterventionRequestStrategy) {
        this.name = options.name
        this.baseUrl = options.baseUrl
        this.ampersand = options.ampersand || this.ampersand
        this.separator = options.separator || this.separator
        this.webp = options.webp || this.webp
        this.operations = { ...this.operations, ...options.operations }


        /**
         * Apply override
         * from global variable
         */
        if (window.interventionRequestJS) {
            /**
             * Override default media options
             * If global configuration is set
             */
            if (window.interventionRequestJS.mediaOptions) {
                this.defaultMediaOptions = {
                    ...this.defaultMediaOptions,
                    ...window.interventionRequestJS.mediaOptions
                }
            }

            /**
             * Override strategy configuration
             * By global strategies config
             */
            if (window.interventionRequestJS.strategies && window.interventionRequestJS.strategies[this.name]) {
                const strategyOverride = window.interventionRequestJS.strategies[this.name]

                this.baseUrl = strategyOverride.baseUrl || this.baseUrl
                this.ampersand = strategyOverride.ampersand || this.ampersand
                this.separator = strategyOverride.separator || this.separator
                this.webp = strategyOverride.webp || this.webp
                this.operations = { ...this.operations, ...strategyOverride.operations }
            }
        }
    }

    /**
     * Compute operations
     * @param format - image format
     * @return string
     */
    private computedOperations (format: InterventionRequestMediaFormat): string {
        let computedOperations = []

        /**
         * Applying default media options
         */
        format = {
            ...this.defaultMediaOptions,
            ...format
        }

        /**
         * Loop thru operations
         */
        for (let operation in format) {
            if (format.hasOwnProperty(operation) && this.operations[operation]) {
                computedOperations.push(`${this.operations[operation]}${this.separator}${format[operation]}`)
            }
        }

        return computedOperations.join(this.ampersand)
    }

    /**
     * Format path
     * @param source - filename
     * @param format - image format
     * @param baseUrl - strategy baseUrl override
     * @param rule - media rule
     * @return string
     */
    public formatPath (source: string, format: InterventionRequestMediaFormat, baseUrl: string | undefined = undefined, rule: boolean | string = false): string {
        let path = `${baseUrl || this.baseUrl}/${this.computedOperations(format)}/${source}`

        if (rule) {
            path += ` ${format.rule}`
        }

        return path
    }
}