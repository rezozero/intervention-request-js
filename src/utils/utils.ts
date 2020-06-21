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
    return checkFileExtension(filename, 'webp')
}

/**
 * Check file extension
 * @param filename
 * @param extension
 * @return boolean
 */
export function checkFileExtension(filename: string, extension: string): boolean {
    return extractFileExtension(filename) === extension
}

/**
 * Extract file extension
 * @param filename
 * @return string
 */
export function extractFileExtension(filename: string): string {
    return filename.split('.').pop().toLowerCase()
}