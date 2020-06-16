declare global {
    interface Window {
        interventionRequestJS: InterventionRequestConfigurations
    }
}

export interface IntrventionRequestStrategy {
    ampersand?: string
    preferWebp?: boolean
}

export interface InterventionRequestConfigurations {
    strategy?: string
    baseUrl?: string,
    defaultMediaOptions?: InterventionRequestMediaFormat
}

export interface InterventionRequestMediaFormat {
    fit?: string
    crop?: string
    align?: string
    flip?: string
    width?: number
    height?: number
    quality?: number
    progressive?: boolean
    interlace?: boolean,
    rule?: string
}


export interface InterventionRequestFormat {
    media?: string
    sizes?: string
    srcset?: Array<InterventionRequestMediaFormat>
}

export type InterventionRequestFormats = Array<InterventionRequestFormat>
