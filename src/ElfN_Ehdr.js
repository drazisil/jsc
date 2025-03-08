import { Uint8_tArray, EI_NIDENT, Uint16_t, Uint32_t, ElfN_Addr, ElfN_Off } from "./types.js";

export const ElfN_Ehdr = () => {
    let e_ident = Uint8_tArray(EI_NIDENT);
    let e_type = Uint16_t();
    let e_machine = Uint16_t();
    let e_version = Uint32_t();
    let e_entry = ElfN_Addr();
    let e_phoff = ElfN_Off();
    let e_shoff = ElfN_Off();
    let e_flags = Uint32_t();
    let e_ehsize = Uint16_t();
    let e_phentsize = Uint16_t();
    let e_phnum = Uint16_t();
    let e_shentsize = Uint16_t();
    let e_shnum = Uint16_t();
    let e_shstrndx = Uint16_t();
    return {
        e_ident,
        e_type,
        e_machine,
        e_version,
        e_entry,
        e_phoff,
        e_shoff,
        e_flags,
        e_ehsize,
        e_phentsize,
        e_phnum,
        e_shentsize,
        e_shnum,
        e_shstrndx,
        get: () => {
            const size = e_ident.size() + e_type.size() + e_machine.size() + e_version.size() + e_entry.size() + e_phoff.size() + e_shoff.size() + e_flags.size() + e_ehsize.size() + e_phentsize.size() + e_phnum.size() + e_shentsize.size() + e_shnum.size() + e_shstrndx.size();
            const buffer = new Uint8Array(size);
            let offset = 0;
            buffer.set(e_ident.get(), offset);
            offset += e_ident.size();
            buffer.set(e_type.get(), offset);
            offset += e_type.size();
            buffer.set(e_machine.get(), offset);
            offset += e_machine.size();
            buffer.set(e_version.get(), offset);
            offset += e_version.size();
            buffer.set(e_entry.get(), offset);
            offset += e_entry.size();
            buffer.set(e_phoff.get(), offset);
            offset += e_phoff.size();
            buffer.set(e_shoff.get(), offset);
            offset += e_shoff.size();
            buffer.set(e_flags.get(), offset);
            offset += e_flags.size();
            buffer.set(e_ehsize.get(), offset);
            offset += e_ehsize.size();
            buffer.set(e_phentsize.get(), offset);
            offset += e_phentsize.size();
            buffer.set(e_phnum.get(), offset);
            offset += e_phnum.size();
            buffer.set(e_shentsize.get(), offset);
            offset += e_shentsize.size();
            buffer.set(e_shnum.get(), offset);
            offset += e_shnum.size();
            buffer.set(e_shstrndx.get(), offset);
            offset += e_shstrndx.size();
            return buffer;
        },
        set: (buffer) => {
            if (buffer.length < e_ident.size() + e_type.size() + e_machine.size() + e_version.size() + e_entry.size() + e_phoff.size() + e_shoff.size() + e_flags.size() + e_ehsize.size() + e_phentsize.size() + e_phnum.size() + e_shentsize.size() + e_shnum.size() + e_shstrndx.size()) {
                throw new Error("Buffer size is too small");
            }

            let offset = 0;
            e_ident.set(buffer.subarray(offset, offset + e_ident.size()));
            offset += e_ident.size();
            e_type.set(buffer.subarray(offset, offset + e_type.size()));
            offset += e_type.size();
            e_machine.set(buffer.subarray(offset, offset + e_machine.size()));
            offset += e_machine.size();
            e_version.set(buffer.subarray(offset, offset + e_version.size()));
            offset += e_version.size();
            e_entry.set(buffer.subarray(offset, offset + e_entry.size()));
            offset += e_entry.size();
            e_phoff.set(buffer.subarray(offset, offset + e_phoff.size()));
            offset += e_phoff.size();
            e_shoff.set(buffer.subarray(offset, offset + e_shoff.size()));
            offset += e_shoff.size();
            e_flags.set(buffer.subarray(offset, offset + e_flags.size()));
            offset += e_flags.size();
            e_ehsize.set(buffer.subarray(offset, offset + e_ehsize.size()));
            offset += e_ehsize.size();
            e_phentsize.set(buffer.subarray(offset, offset + e_phentsize.size()));
            offset += e_phentsize.size();
            e_phnum.set(buffer.subarray(offset, offset + e_phnum.size()));
            offset += e_phnum.size();
            e_shentsize.set(buffer.subarray(offset, offset + e_shentsize.size()));
            offset += e_shentsize.size();
            e_shnum.set(buffer.subarray(offset, offset + e_shnum.size()));
            offset += e_shnum.size();
            e_shstrndx.set(buffer.subarray(offset, offset + e_shstrndx.size()));
            offset += e_shstrndx.size();
        }
    };
};
