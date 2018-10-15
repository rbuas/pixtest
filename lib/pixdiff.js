const fs = require('fs');
const jpeg = require('jpeg-js');
const pixelmatch = require('pixelmatch');

/**
 * pixdiff
 * @param {string} img
 * @returns {object} { width, height, data }
 */
function decodeJpeg(img) {
  const content = fs.readFileSync(img);
  return jpeg.decode(content);
}

function encodeJpeg(raw, file) {
  const encoded = jpeg.encode(raw, 50);

  if (file) {
    fs.writeFileSync(file, encoded.data);
  }

  return encoded;
}

function pixdiff(image1, image2, imageDiff, threshold = 0.1) {
  const i1 = decodeJpeg(image1);
  const i2 = decodeJpeg(image2);

  const { width, height } = i1; // need to be equal to i2

  const data = Buffer.alloc(width * height * 4);

  const diff = pixelmatch(i1.data, i2.data, data, width, height, { threshold });

  encodeJpeg({ data, width, height }, imageDiff);

  return diff;
}

module.exports = pixdiff;
