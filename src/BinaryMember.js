import { BINARY_ALIGNMENT } from "./config.js";
import { addAlignementPadding, verifyAlignment } from "./utility.js";

export const BinaryMember = (size = 0) => {
    let value = new Uint8Array(size);
    const maxSize = size;
    return {
        set: (v) => {
            if (v.length > maxSize) {
                throw new Error(`Value exceeds maximum size of ${maxSize}`);
            }
            value = addAlignementPadding(v, BINARY_ALIGNMENT);
        },
        get: () => {
            verifyAlignment(value, BINARY_ALIGNMENT);
            return value;
        },
        size: () => value.length,
    };
};
