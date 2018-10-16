const fs = require('fs');

const { pixtest } = require('..');
const pixdiff = require('../pixdiff');

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  copyFileSync: jest.fn(),
  existsSync: jest.fn(),
  unlinkSync: jest.fn(),
}));

jest.mock('../pixdiff', () => jest.fn());

describe('pixtest', () => {
  it('should replace the ground truth by the candidate', () => {
    fs.existsSync.mockReturnValue(false);

    const result = pixtest({ test: 'neo', dir: 'matrix', candidate: 'anderson' });
    expect(result).toBe(-1);
  });

  it('should replace the ground truth by the candidate when use force flag', () => {
    fs.existsSync.mockReturnValue(true);

    const result = pixtest({
      test: 'neo',
      dir: 'matrix',
      candidate: 'anderson',
      replaceGroundTruth: true,
    });
    expect(result).toBe(-1);
  });

  it('should remove diff file when images are the same', () => {
    fs.existsSync.mockReturnValue(true);

    const result = pixtest({
      test: 'neo',
      dir: 'matrix',
      candidate: 'anderson',
    });
    expect(result).toBe(0);
  });

  it('should keep diff file when images are differents', () => {
    fs.existsSync.mockReturnValue(true);
    pixdiff.mockReturnValue(10);

    const result = pixtest({
      test: 'neo',
      dir: 'matrix',
      candidate: 'anderson',
    });
    expect(result).toBe(10);
  });
});
