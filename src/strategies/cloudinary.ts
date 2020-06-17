/**
 * Cloudinary strategy
 * @description Cloudinary strategy default configuration
 * @author ravorona
 */
const cloudinaryStrategy: InterventionRequestStrategy = {
    name: 'cloudinary',
    baseUrl: 'https://res.cloudinary.com/demo/image/upload',
    ampersand: ',',
    separator: '_',
    webp: false,
}

export default cloudinaryStrategy
