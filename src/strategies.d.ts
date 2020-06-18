import Strategy from './utils/strategy'

export namespace InterventionRequestStrategies {
    interface Base {
        name: string
        baseUrl: string
        ampersand?: string
        separator?: string
        webp?: boolean
        operations?: Operations
    }

    interface Operations {
        [index: string]: string
        align: string
        fit: string
        flip: string
        crop: string
        width: string
        height: string
        background: string
        greyscale: string
        blur: string
        quality: string
        progressive: string
        interlace: string
        sharpen: string
        contrast: string
    }

    interface Strategies {
        [index: string]: Strategy
    }
}

export interface InterventionRequestOperations extends InterventionRequestStrategies.Operations {}
export interface InterventionRequestStrategy extends InterventionRequestStrategies.Base {}
export interface InterventionRequestStrategies extends InterventionRequestStrategies.Strategies {}