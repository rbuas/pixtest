const fs = require('fs');
const pixelmatch = require('pixelmatch');

const { pixdiff } = require('..');

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  copyFileSync: jest.fn(),
  existsSync: jest.fn(),
  unlinkSync: jest.fn(),
  writeFileSync: jest.fn(),
}));
jest.mock('jpeg-js', () => ({
  decode: jest.fn().mockReturnValue({}),
  encode: jest.fn().mockReturnValue({}),
}));
jest.mock('pixelmatch', () => jest.fn());

describe('pixdiff', () => {
  it('should compare two dirrefent images', () => {
    fs.existsSync.mockReturnValue(false);
    pixelmatch.mockReturnValue(10);

    const result = pixdiff('image1', 'image2', 'imageDiff');
    expect(result).toBe(10);
  });

  it('should compare two indentical images', () => {
    fs.existsSync.mockReturnValue(false);
    pixelmatch.mockReturnValue(10);

    const result = pixdiff('image1', 'image2');
    expect(result).toBe(10);
  });
});
