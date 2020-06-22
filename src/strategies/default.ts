/**
 * Default strategy
 * @description Intervention request default strategy configuration
 * @author ravorona
 */
import { InterventionRequestStrategy } from '../strategies'

const defaultStrategy: InterventionRequestStrategy = {
    name: 'default',
    baseUrl: '/assets',
    ampersand: '-',
    webp: true
}

export default defaultStrategy
