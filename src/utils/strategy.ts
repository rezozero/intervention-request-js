/**
 * Strategy
 * @description Build providers default strategy
 * @author ravorona
 */
import { InterventionRequestStrategyOperations, InterventionRequestStrategy, InterventionRequestStrategyFormat } from '../strategies'

export default class Strategy implements InterventionRequestStrategy {
    /**
     * Strategy defaults
     */
    public name: string
    public baseUrl: string
    public ampersand: string = '-'
    public separator: string = ''
    public webp: boolean = false
    public operations: InterventionRequestStrategyFormat = {
        format: {
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
    }

    /**
     * Default media options
     * @return InterventionRequestOperations
     */
    private readonly defaultMediaOptions: InterventionRequestStrategyFormat = {
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
    private computedOperations (format: InterventionRequestStrategyOperations): string {
        let computedOperations = []

        /**
         * Applying default media options
         */
        let computedFormat = {
            ...this.defaultMediaOptions.format,
            ...format
        }

        /**
         * Loop thru operations
         */
        for (let operation in computedFormat) {
            if (computedFormat.hasOwnProperty(operation) && this.operations.format[operation]) {
                computedOperations.push(`${this.operations.format[operation]}${this.separator}${computedFormat[operation]}`)
            }
        }

        return computedOperations.join(this.ampersand)
    }

    /**
     * Format path
     * @param source - filename
     * @param operations - image format
     * @param baseUrl - strategy baseUrl override
     * @param rule - media rule
     * @return string
     */
    public formatPath (source: string, operations: InterventionRequestStrategyFormat, baseUrl: string | undefined = undefined, rule: boolean = false): string {
        let path = `${baseUrl || this.baseUrl}/${this.computedOperations(operations.format)}/${source}`

        if (rule && operations.rule) {
            path += ` ${operations.rule}`
        }

        return path
    }
}