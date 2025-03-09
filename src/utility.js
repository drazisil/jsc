import { createReadStream, createWriteStream } from "node:fs";
import { access, readFile, writeFile } from "node:fs/promises";

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

/**
 * Backs up a file by creating a copy with a timestamped filename.
 *
 * @param {string} filename - The name of the file to back up.
 * @param {number} startTimestamp - The timestamp to append to the backup filename.
 * @returns {Promise<void>} A promise that resolves when the backup is complete.
 */
export async function backupFile(filename, startTimestamp) {
    try {
        await access(filename);
        const backupFilename = `${filename}.${startTimestamp}.bak`;
        const readStream = createReadStream(filename);
        const writeStream = createWriteStream(backupFilename);
        readStream.pipe(writeStream);
        await new Promise((resolve, reject) => {
            /**
             * @param {void} value
             * @returns {void}
             */
            writeStream.on('finish', /** @type {() => void} */(resolve));
            writeStream.on('error', reject);
        });
        console.log(`Backed up ${filename} to ${backupFilename}`);
    } catch (err) {
        console.error(`Failed to back up ${filename}: ${err}`);
    }
}

/**
 * getopt -- command option parsing
 * 
 * @description
 * This function parses command-line options and operands.
 * 
 * The `getopt` function uses to following global variables:
 * - `optind`: The index of the next element in the `argv` array to be processed.
 * 
 * The `getopt` function takes the following arguments:
 * - `argc`: The number of command-line arguments.
 * - `argv`: An array of command-line arguments.
 * - `optstring`: A string containing the valid option characters.
 * 
 * The `optstring` argument may contain the following characters:
 * - Characters that represent options without arguments.
 * - Characters that represent options with required arguments.
 * - A colon (`:`) to indicate that an option requires an argument.
 * 
 * The `getopt` function returns an object with two properties:
 * - `options`: An object containing the parsed options.
 * - `operands`: An array containing the operands.
 * 
 * The `getopt` function follows the POSIX standard for command-line option parsing.
 * It has the following rules:
 * - Options are single characters preceded by a hyphen (`-`).
 * - Options may be grouped after a single hyphen.
 * - Options may be followed by an argument.
 * - The argument shall be separated from the option by a space.
 * - The argument may be optional or required.
 * - Options may be followed by operands.
 * - The `--` option terminates option processing.
 * 
 * 
 * @param {number} argc - The number of command-line arguments.
 * @param {string[]} argv - An array of command-line arguments.
 * @param {string} optstring - A string containing the valid option characters.
 * @returns {{ options: Record<string, string | boolean>, operands: string[] }} - The parsed options and operands.
 * @throws {Error} If an unknown option is encountered.
 * @throws {Error} If an option requires an argument but none is provided.
 */
export function getopt(argc, argv, optstring) {
    /** @type {Record<string, string | boolean>} */
    const options = {};
    const operands = [];
    const optionArgMap = {};
    let optind = 2;

    // Build the option argument map
    for (let i = 0; i < optstring.length; i++) {
        const opt = optstring[i];
        if (opt === ':') continue;
        optionArgMap[opt] = optstring[i + 1] === ':';
    }

    while (optind < argc) {
        const arg = argv[optind];
        if (arg === '--') {
            optind++;
            break;
        }
        if (arg.startsWith('-') && arg.length > 1) {
            for (let j = 1; j < arg.length; j++) {
                const opt = arg[j];
                if (!Object.prototype.hasOwnProperty.call(optionArgMap, opt)) {
                    throw new Error(`Unknown option: -${opt}`);
                }
                if (optionArgMap[opt]) {
                    if (j < arg.length - 1) {
                        options[opt] = arg.slice(j + 1);
                        break;
                    }
                        optind++;
                        if (optind >= argc) {
                            throw new Error(`Option -${opt} requires an argument`);
                        }
                        options[opt] = argv[optind];
                        break;
                }
                options[opt] = true;
            }
            optind++;
        } else {
            operands.push(arg);
            optind++;
        }
    }

    // Add remaining arguments as operands
    while (optind < argc) {
        operands.push(argv[optind++]);
    }

    return { options, operands };
}

/**
 * Checks if an option is present in the options object.
 * 
 * @param {Object} options 
 * @param {string} opt
 * @returns {boolean}
 */
export function hasOption(options, opt) {
    const exists = Object.hasOwn(options.options, opt);
    return exists && options[opt] !== false;
}
