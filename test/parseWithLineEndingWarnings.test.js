const parseWithLineEndingWarnings = require('../lib').parseWithLineEndingWarnings;
const gitStatusOutputSample = ' M example/index.js\0  M lib/index.js\0  M package.json\0 ?? .idea/';
const lineEndingsError = `
warning: LF will be replaced by CRLF in path/to/x/y.z
The file will have its original line endings in your working directory.
`.trim();
test('should return unchanged result if no error', () => {
    parseWithLineEndingWarnings((err, data) => {
        expect(err).toBe(null);
        expect(data).toMatchSnapshot();
    })(null, [{x: '', y: '', to: '', from: ''}]);
});

test('should give back only an error if spawno fails', () => {
    parseWithLineEndingWarnings((err, data) => {
        expect(err.message).toBe('oh');
        expect(data).toBe(undefined);
    })(new Error('oh'), '');
});

test('should parse result if only line error warnings found', () => {
    parseWithLineEndingWarnings((err, data) => {
        expect(err).toBe(null);
        expect(data).toMatchSnapshot();
    })(lineEndingsError, gitStatusOutputSample);
});

test('should provide error if not only line error warnings found', () => {
    parseWithLineEndingWarnings((err, data) => {
        expect(err).toMatchSnapshot();
        expect(data).toBe(undefined);
    })(lineEndingsError + '\nOh snap!', gitStatusOutputSample);
});