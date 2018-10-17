const fs = require('fs');
const path = require('path');

const pixdiff = require('./pixdiff');

/**
 * pixtest
 * @param {string} test Test case name
 * @param {string} dir Path to images directory
 * @param {string} candidate Path to the candidate image to compare with the ground truth
 * @param {string} threshold Tolerance to image test
 * @param {string} replaceGroundTruth Flag to force the ground truth replacement
 * @returns {int} Number of different pixels
 */
function pixtest({ test, dir, candidate, threshold, replaceGroundTruth = false }) {
  const groundTruth = path.resolve(`${dir}/${test}`);
  const saveGroundTruth = replaceGroundTruth || !fs.existsSync(groundTruth);
  if (saveGroundTruth) {
    fs.copyFileSync(candidate, groundTruth);
    return -1;
  }

  const diffFile = path.resolve(`${dir}/${test}.diff.jpg`);
  const diff = pixdiff(groundTruth, candidate, diffFile, threshold);
  if (!diff) {
    fs.unlinkSync(diffFile);
    return 0;
  }

  if (!saveGroundTruth) {
    const candidateFile = path.resolve(`${dir}/${test}.new.jpg`);
    fs.copyFileSync(candidate, candidateFile);
  }

  return diff;
}

module.exports = pixtest;
