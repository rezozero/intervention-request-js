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