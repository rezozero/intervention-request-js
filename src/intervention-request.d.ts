import {
    InterventionRequestStrategyFormat,
    InterventionRequestStrategies,
    InterventionRequestStrategyOperations
} from './strategies'

export namespace  InterventionRequest {
    interface Configurations {
        debug?: boolean | string
        strategy?: string
        baseUrl?: string
        forceIo?: boolean
        mimeType?: string
        fileuploadFolder?: string
        loading: 'lazy' | 'eager' | 'auto'
        strategies?: InterventionRequestStrategies
        mediaOptions?: InterventionRequestStrategyOperations
    }

    interface Format {
        media?: string
        rule?: string
        srcset?: Array<InterventionRequestStrategyFormat>
    }

    type Media = Array<Format>
}

export interface InterventionRequestConfigurations extends InterventionRequest.Configurations {}
export interface InterventionRequestFormat extends InterventionRequest.Format {}
export interface InterventionRequestMedia extends InterventionRequest.Media {}

declare global {
    interface Window {
        interventionRequestJS: InterventionRequestConfigurations
        irCounter: number
    }
}