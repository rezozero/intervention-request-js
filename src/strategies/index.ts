import defaultStrategy from '../strategies/default'
import cloudinaryStrategy from '../strategies/cloudinary'
import noprocessStrategy from '../strategies/noprocess'
import Strategy from '../utils/strategy'
import { InterventionRequestStrategies } from '../strategies'

/**
 * Strategy list
 * @description Available strategy wrapper
 * @author ravorona
 */
const strategiesList: InterventionRequestStrategies = {
    default: new Strategy(defaultStrategy),
    cloudinary: new Strategy(cloudinaryStrategy),
    noprocess: new Strategy(noprocessStrategy)
}

export default strategiesList