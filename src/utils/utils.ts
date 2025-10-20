/**
 * InterventionRequest Utils
 * @description Useful functions
 */

import { parseURL, stringifyParsedURL } from "ufo"

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

/**
 * Add extension to src URL
 * A src (URL) can be like /path/to/image.jpg or /path/to/image.jpg?param=value,
 * so we need to parse it properly.
 * A use case is when we want to add webp extension to an URL,
 * but we need to keep the original query parameters.
 * Ie: /path/to/image.jpg -> /path/to/image.jpg.webp
 *     /path/to/image.jpg?param=value -> /path/to/image.jpg.webp?param=value
 *
 * @param src
 * @param extension
 * @return string
 */
export function addExtensionToSrc(src: string, extension: string): string {
    const value = parseURL(src)

    value.pathname += `.${extension}` // Append extension

    return stringifyParsedURL(value)
}