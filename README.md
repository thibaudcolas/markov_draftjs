# markov_draftjs [![PyPI](https://img.shields.io/pypi/v/markov_draftjs.svg)](https://pypi.python.org/pypi/markov_draftjs) [![npm](https://img.shields.io/npm/v/markov_draftjs.svg?style=flat-square)](https://www.npmjs.com/package/markov_draftjs) [![Build Status](https://travis-ci.org/thibaudcolas/markov_draftjs.svg?branch=master)](https://travis-ci.org/thibaudcolas/markov_draftjs)

> Draft.js sample content generated with [Markov chains](https://en.wikipedia.org/wiki/Markov_chain) of [Project Gutenberg](https://www.gutenberg.org/) books.

This sample content is meant to be used while testing projects based on Draft.js, in particular [Draftail](https://github.com/springload/draftail) and [draftjs_exporter](https://github.com/springload/draftjs_exporter).

## Using the sample content

In order to facilitate using the samples across multiple projects, they are published as packages on [npm](https://www.npmjs.com/package/markov_draftjs) and [PyPI](https://pypi.python.org/pypi/markov_draftjs).

npm install

pypi install

## Using the generation scripts

```sh
# Unarchive sample text.
cd corpora/
tar -xzvf *.tar.gz
cd ..

# Install dependencies
nvm install
npm install

# Generate a fresh content export.
npm run start
```

## See also

- https://github.com/jsvine/markovify
- https://github.com/catseye/Guten-gutter
