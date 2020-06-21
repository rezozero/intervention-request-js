import Strategy from './utils/strategy'

export namespace InterventionRequestStrategies {
    interface Base {
        name: string
        baseUrl: string
        ampersand?: string
        separator?: string
        webp?: boolean
        operations?: Format
    }

    interface Operations {
        [index: string]: string | number | undefined
        align?: string
        fit?: string
        flip?: string
        crop?: string
        width?: string | number
        height?: string | number
        background?: string
        greyscale?: string | number
        blur?: string | number
        quality?: string | number
        progressive?: string | number
        interlace?: string | number
        sharpen?: string | number
        contrast?: string | number
    }

    interface Format {
        format?: Operations
        rule?: string
    }

    interface Strategies {
        [index: string]: Strategy
    }
}

export interface InterventionRequestStrategyOperations extends InterventionRequestStrategies.Operations {}
export interface InterventionRequestStrategyFormat extends InterventionRequestStrategies.Format {}
export interface InterventionRequestStrategy extends InterventionRequestStrategies.Base {}
export interface InterventionRequestStrategies extends InterventionRequestStrategies.Strategies {}