# pixtest

[![tag](https://img.shields.io/github/tag/rbuas/pixtest.svg)](https://GitHub.com/rbuas/pixtest/tags/)
[![build](https://travis-ci.org/rbuas/pixtest.svg?branch=master)](https://travis-ci.org/rbuas/pixtest)

A library to compare and test images through image differential.

- [installation](#installation)
- [usage](#usage)

## Installation
```
npm install pixtest
```

## Usage
```
const { pixtest } = require('pixtest');
const diff = pixtest({
  test: 'testcase-1.jpg',
  dir: `${__dirname}/imagediff`,
  candidate: 'testcase-1-newversion.jpg'
});
```


