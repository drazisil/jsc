import { equal, throws, deepEqual } from 'node:assert';
import { describe, test } from 'mocha';
import { getopts } from '../src/utility.js';


describe('getopt', () => {
    test('should parse options without arguments', () => {
        const argv = ['node', 'script.js', '-a', '-b'];
        const optstring = 'ab';
        const result = getopts(argv.length, argv, optstring);
        deepEqual(result, { options: { a: true, b: true }, operands: [] });
    });

    test('should parse options with required arguments', () => {
        const argv = ['node', 'script.js', '-a', 'value1', '-b', 'value2'];
        const optstring = 'a:b:';
        const result = getopts(argv.length, argv, optstring);
        deepEqual(result, { options: { a: 'value1', b: 'value2' }, operands: [] });
    });

    test('should parse mixed options and operands', () => {
        const argv = ['node', 'script.js', '-a', 'value1', 'operand1', '-b', 'value2', 'operand2'];
        const optstring = 'a:b:';
        const result = getopts(argv.length, argv, optstring);
        deepEqual(result, { options: { a: 'value1', b: 'value2' }, operands: ['operand1', 'operand2'] });
    });

    test('should handle unknown options', () => {
        const argv = ['node', 'script.js', '-a', '-x'];
        const optstring = 'a';
        throws(() => getopts(argv.length, argv, optstring), /Unknown option: -x/);
    });

    test('should handle missing required arguments', () => {
        const argv = ['node', 'script.js', '-a'];
        const optstring = 'a:';
        throws(() => getopts(argv.length, argv, optstring), /Option -a requires an argument/);
    });

    test('should stop parsing at --', () => {
        const argv = ['node', 'script.js', '-a', '--', '-b'];
        const optstring = 'a';
        const result = getopts(argv.length, argv, optstring);
        deepEqual(result, { options: { a: true }, operands: ['-b'] });
    });

    test('should parse grouped options', () => {
        const argv = ['node', 'script.js', '-abc'];
        const optstring = 'abc';
        const result = getopts(argv.length, argv, optstring);
        deepEqual(result, { options: { a: true, b: true, c: true }, operands: [] });
    });

    test('should parse options with arguments attached', () => {
        const argv = ['node', 'script.js', '-aValue1', '-bValue2'];
        const optstring = 'a:b:';
        const result = getopts(argv.length, argv, optstring);
        deepEqual(result, { options: { a: 'Value1', b: 'Value2' }, operands: [] });
    });
});
