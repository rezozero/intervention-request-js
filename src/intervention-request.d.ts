import { InterventionRequestOperations, InterventionRequestStrategies } from './strategies'

export namespace  InterventionRequest {
    interface Configurations {
        strategy?: string
        baseUrl?: string
        forceIo?: boolean
        loading: 'lazy' | 'eager' | 'auto'
        strategies?: InterventionRequestStrategies
        mediaOptions?: InterventionRequestOperations
    }

    interface Format {
        media?: string
        sizes?: string
        srcset?: Array<InterventionRequestOperations>
    }

    type Formats = Array<Format>
}

export interface InterventionRequestConfigurations extends InterventionRequest.Configurations {}
export interface InterventionRequestFormat extends InterventionRequest.Format {}
export interface InterventionRequestFormats extends InterventionRequest.Formats {}

declare global {
    interface Window {
        interventionRequestJS: InterventionRequestConfigurations
    }
}