/**
 * No process strategy
 * @description Intervention request noprocess strategy configuration
 * @author ravorona
 */
import { InterventionRequestStrategy } from '../strategies'

const noprocessStrategy: InterventionRequestStrategy = {
    name: 'noprocess',
    process: false
}

export default noprocessStrategy
