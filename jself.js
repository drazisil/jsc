import { writeFile } from "node:fs/promises";
import { createElfHeader } from "./src/createElfHeader.js";
import { backupFile, getopts, hasOption } from "./src/utility.js";





// ==============================
// JAVASCRIPT SELF-INVOKING FUNCTION
// ==============================

async function main() {

    const args = process.argv;

    const options = getopts(args.length, args, 'h--helpa--about');

    if (hasOption(options, 'h') || hasOption(options, 'help')) {
        console.log("Usage: node jself.js <name>");
        process.exit(0);
    }

    if (hasOption(options, 'a') || hasOption(options, 'about')) {
        console.log("This is a simple utility to create an ELF header file.");
        process.exit(0);
    }

    if (args.length < 3) {
        console.log("Usage: node jself.js <name>");
        process.exit(1);
    }

    const startTimestamp = Date.now();
    console.log(`Start timestamp: ${startTimestamp}`);

    const filename = options.operands[0];

    if (filename === undefined) {
        console.error("Filename is required");
        process.exit
    }

    // Check if the file already exists
    await backupFile(filename, startTimestamp);

    // Create a new ELF header
    const buffer = createElfHeader();

    // Save the ELF header to a file
    await writeFile(filename, buffer);

    console.log(`Wrote ELF header to ${filename}`);

    return 0;
}

await main();


