/**
 * InterventionRequest Utilz
 * @description Useful functions
 * @author ravorona
 */

/**
 * Check if file contain webp extension
 * @param filename
 * @return boolean
 */
export function isWebp(filename: string): boolean {
    return filename.split('.').pop().toLowerCase() === 'webp'
}

/**
 * Console log wrapper
 * @param message
 */
export function log(message: string): void {
    console.log('%cintervention request', 'background: #540c82; color: #fff; padding: 2px 4px;', message)
}