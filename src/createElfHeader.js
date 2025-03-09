import { ElfN_Ehdr } from "./ElfN_Ehdr.js";
import { EI_MAG0, EI_MAG1, EI_MAG2, EI_MAG3, EI_CLASS, EI_DATA, EI_VERSION, EI_OSABI, EI_ABIVERSION, EI_PAD } from "./types.js";

export function createElfHeader() {
    const ehdr = ElfN_Ehdr();
    ehdr.e_ident.set(new Uint8Array([EI_MAG0, EI_MAG1, EI_MAG2, EI_MAG3, EI_CLASS.ELFCLASS32, EI_DATA.ELFDATA2LSB, EI_VERSION, EI_OSABI.ELFOSABI_SYSV, EI_ABIVERSION, EI_PAD, EI_PAD, EI_PAD, EI_PAD, EI_PAD, EI_PAD, EI_PAD]));
    ehdr.e_type.set(new Uint16Array([1]));
    ehdr.e_machine.set(new Uint16Array([3]));
    ehdr.e_version.set(new Uint32Array([1]));
    ehdr.e_entry.set(new Uint32Array([0]));
    ehdr.e_phoff.set(new Uint32Array([0]));
    ehdr.e_shoff.set(new Uint32Array([0]));
    ehdr.e_flags.set(new Uint32Array([0]));
    ehdr.e_ehsize.set(new Uint16Array([52]));
    ehdr.e_phentsize.set(new Uint16Array([0]));
    ehdr.e_phnum.set(new Uint16Array([0]));
    ehdr.e_shentsize.set(new Uint16Array([0]));
    ehdr.e_shnum.set(new Uint16Array([0]));
    ehdr.e_shstrndx.set(new Uint16Array([0]));

    // Print the ELF header as hexadecimal in rows of 16 bytes
    const buffer = ehdr.get();
    for (let i = 0; i < buffer.length; i += 16) {
        const row = buffer.subarray(i, i + 16);
        console.log(row.reduce((acc, val) => `${acc + val.toString(16).padStart(2, '0')} `, ''));
    }
    return buffer;
}
