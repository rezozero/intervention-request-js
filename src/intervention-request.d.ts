import { InterventionRequestStrategies } from './strategies'

export namespace  InterventionRequest {
    interface Configurations {
        strategy?: string
        baseUrl?: string
        forceIo?: boolean
        loading: 'lazy' | 'eager' | 'auto'
        strategies?: InterventionRequestStrategies
        mediaOptions?: MediaFormat
    }

    interface MediaFormat {
        [index: string]: string | number | undefined
        fit?: string
        crop?: string
        align?: string
        flip?: string
        width?: number
        height?: number
        quality?: number
        progressive?: number
        interlace?: number
        rule?: string
    }


    interface Format {
        media?: string
        sizes?: string
        srcset?: Array<MediaFormat>
    }

    type Formats = Array<Format>
}

export interface InterventionRequestConfigurations extends InterventionRequest.Configurations {}
export interface InterventionRequestMediaFormat extends InterventionRequest.MediaFormat {}
export interface InterventionRequestFormat extends InterventionRequest.Format {}
export interface InterventionRequestFormats extends InterventionRequest.Formats {}

declare global {
    interface Window {
        interventionRequestJS: InterventionRequestConfigurations
    }
}