/**
 * Aligns a given number to the specified alignment.
 *
 * @param {number} n - The number to be aligned.
 * @param {number} alignment - The alignment boundary.
 * @returns {number} - The aligned number.
 */
function align(n, alignment) {
    return (n + alignment - 1) & ~(alignment - 1);
}
/**
 * Adds padding to a buffer to align its length to the specified alignment.
 *
 * @param {Uint8Array} buffer - The buffer to which padding will be added.
 * @param {number} alignment - The alignment boundary to which the buffer length should be aligned.
 * @returns {Uint8Array} A new buffer with the original buffer's content and the added padding.
 */
export function addAlignementPadding(buffer, alignment) {
    const padding = new Uint8Array(align(buffer.length, alignment) - buffer.length);
    return new Uint8Array([...buffer, ...padding]);
}
/**
 * Verifies that the length of the buffer is aligned to the specified alignment.
 *
 * @param {Uint8Array} buffer - The buffer to verify
 * @param {number} alignment - The alignment value to check against.
 * @throws {Error} If the buffer length is not aligned to the specified alignment.
 */
export function verifyAlignment(buffer, alignment) {
    if (buffer.length % alignment !== 0) {
        throw new Error(`Buffer size is not aligned to ${alignment}`);
    }
}
/**
 * Converts a 16-bit number from host byte order to network byte order.
 *
 * @param {number} n - The 16-bit number to convert.
 * @returns {number} The converted 16-bit number in network byte order.
 */
function htons(n) {
    return ((n & 0xff) << 8) | ((n >> 8) & 0xff);
}
/**
 * Converts a 32-bit number from host byte order to network byte order.
 *
 * @param {number} n - The 32-bit number to be converted.
 * @returns {number} - The converted 32-bit number in network byte order.
 */
function htonl(n) {
    return ((n & 0xff) << 24) | ((n & 0xff00) << 8) | ((n & 0xff0000) >> 8) | ((n >> 24) & 0xff);
}
/**
 * Converts a 16-bit number from network byte order to host byte order.
 *
 * @param {number} n - The 16-bit number in network byte order.
 * @returns {number} - The 16-bit number in host byte order.
 */
function ntohs(n) {
    return htons(n);
}
/**
 * Converts a network byte order integer to host byte order.
 *
 * @param {number} n - The number in network byte order.
 * @returns {number} - The number in host byte order.
 */
function ntohl(n) {
    return htonl(n);
}
