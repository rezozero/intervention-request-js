/**
 * Strategy
 * @description Build providers default strategy
 * @author ravorona
 */
import {
    InterventionRequestStrategyOperations,
    InterventionRequestStrategy,
    InterventionRequestStrategyFormat
} from '../strategies'
import { InterventionRequestConfigurations } from "../intervention-request"

export default class Strategy implements InterventionRequestStrategy {
    /**
     * Strategy defaults
     */
    public name: string
    public baseUrl: string
    public ampersand: string = '-'
    public separator: string = ''
    public webp: boolean = false
    public process: boolean = true
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
    private defaultMediaOptions: InterventionRequestStrategyFormat = {
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
        this.operations = {...this.operations, ...options.operations}

        if ('process' in options) {
            this.process = options.process
        }

        /**
         * Apply override
         * from global variable
         */
        if (window?.interventionRequestJS) {
            this.mergeConfigurations(window.interventionRequestJS)
        }
    }

    /**
     * Compute operations
     * @param format - image format
     * @return string
     */
    private computedOperations(format: InterventionRequestStrategyOperations): string {
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
    public formatPath(source: string, operations: InterventionRequestStrategyFormat, baseUrl: string | undefined = undefined, rule: boolean = false): string {
        let basePath = baseUrl || this.baseUrl
        let path = source

        if (this.process) {
            path = `${this.computedOperations(operations.format)}/${path}`
        }

        if (basePath) {
            basePath = basePath.replace(/\+$/, '')
            path = `${basePath}/${path}`
        }

        if (rule && operations.rule) {
            path += ` ${operations.rule}`
        }

        return path
    }

    /**
     * Merge configurations
     * @param configurations - InterventionRequestConfigurations
     */
    public mergeConfigurations(configurations: InterventionRequestConfigurations) {
        /**
         * Override default media options
         */
        if (configurations.mediaOptions) {
            this.defaultMediaOptions = {
                ...this.defaultMediaOptions,
                ...configurations.mediaOptions
            }
        }

        /**
         * Override strategy configuration
         */
        if (configurations.strategies && configurations.strategies[this.name]) {
            const strategyOverride = configurations.strategies[this.name]

            this.baseUrl = strategyOverride.baseUrl || this.baseUrl
            this.ampersand = strategyOverride.ampersand || this.ampersand
            this.separator = strategyOverride.separator || this.separator
            this.webp = strategyOverride.webp || this.webp
            this.operations = {...this.operations, ...strategyOverride.operations}
        }
    }
}
