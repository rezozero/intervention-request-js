/**
 * Cloudinary strategy
 * @description Cloudinary strategy default configuration
 * @author ravorona
 */
import { InterventionRequestStrategy } from '../strategies'

const cloudinaryStrategy: InterventionRequestStrategy = {
    name: 'cloudinary',
    baseUrl: 'https://res.cloudinary.com/demo/image/upload',
    ampersand: ',',
    separator: '_',
    webp: false,
}

export default cloudinaryStrategy
