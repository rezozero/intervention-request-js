export namespace  InterventionRequest {
    interface Configurations {
        strategy?: string
        baseUrl?: string
        lazy?: boolean
        strategies?: InterventionRequestStrategies
        defaultMediaOptions?: MediaFormat
    }

    interface MediaFormat {
        [index: string]: string | number
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

declare global {
    interface InterventionRequestConfigurations extends InterventionRequest.Configurations {}
    interface InterventionRequestMediaFormat extends InterventionRequest.MediaFormat {}
    interface InterventionRequestFormat extends InterventionRequest.Format {}
    interface InterventionRequestFormats extends InterventionRequest.Formats {}

    interface Window {
        interventionRequestJS: InterventionRequestConfigurations
    }
}