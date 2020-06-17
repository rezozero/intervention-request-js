import Strategy from '~/utils/strategy'

export namespace InterventionRequest {
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

declare global {
    interface InterventionRequestOperations extends InterventionRequest.Operations {}
    interface InterventionRequestStrategy extends InterventionRequest.Base {}
    interface InterventionRequestStrategies extends InterventionRequest.Strategies {}
}