import { BinaryMember } from "./BinaryMember.js";

export const EI_NIDENT = 16;
export const EI_MAG0 = 0x7f;
export const EI_MAG1 = 'E'.charCodeAt(0);
export const EI_MAG2 = 'L'.charCodeAt(0);
export const EI_MAG3 = 'F'.charCodeAt(0);
export const EI_CLASS = {
    ELFCLASSNONE: 0,
    ELFCLASS32: 1,
    ELFCLASS64: 2,
};
export const EI_DATA = {
    ELFDATANONE: 0,
    ELFDATA2LSB: 1,
    ELFDATA2MSB: 2,
};
export const EI_VERSION = 1;
export const EI_OSABI = {
    ELFOSABI_SYSV: 0,
    ELFOSABI_HPUX: 1,
    ELFOSABI_NETBSD: 2,
    ELFOSABI_LINUX: 3,
    ELFOSABI_SOLARIS: 6,
    ELFOSABI_AIX: 7,
    ELFOSABI_FREEBSD: 9,
    ELFOSABI_OPENBSD: 12,
};
export const EI_ABIVERSION = 0;
export const EI_PAD = 0;
const Uint8_t = () => BinaryMember(1);
export const Uint16_t = () => BinaryMember(2);
export const Uint32_t = () => BinaryMember(4);
export const Uint8_tArray = (size) => BinaryMember(size);
export const ElfN_Addr = () => Uint32_t();
export const ElfN_Off = () => Uint32_t();
const ElfN_Section = () => Uint16_t();
const ElfN_Versym = () => Uint16_t();
const ElfN_Half = () => Uint16_t();
const ElfN_Sword = () => Uint32_t();
const ElfN_Word = () => Uint32_t();
const ElfN_Sxword = () => Uint32_t();
const ElfN_Xword = () => Uint32_t();
const Elf_Btype = () => Uint8_t();
