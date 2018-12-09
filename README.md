# markov_draftjs [![PyPI](https://img.shields.io/pypi/v/markov_draftjs.svg)](https://pypi.python.org/pypi/markov_draftjs) [![npm](https://img.shields.io/npm/v/markov_draftjs.svg?style=flat-square)](https://www.npmjs.com/package/markov_draftjs) [![Build Status](https://travis-ci.org/thibaudcolas/markov_draftjs.svg?branch=master)](https://travis-ci.org/thibaudcolas/markov_draftjs)

> Draft.js sample content generated with [Markov chains](https://en.wikipedia.org/wiki/Markov_chain) of [Project Gutenberg](https://www.gutenberg.org/) books.

This sample content is meant to be used while testing projects based on Draft.js, in particular [Draftail](https://www.draftail.org/) and [draftjs_exporter](https://github.com/springload/draftjs_exporter).

## Why

Sample content can be useful to stress-test and benchmark tools built to handle Draft.js content. For the exporter, this is a great way to reliably assess its performance.

The content from this repository isn't generated randomly – while the text and metadata values are fake, the content’s structure and the distribution of rich text formatting amongst the text is representative of that of 3 big CMS sites combined.

Here are rich text formats used in the content:

- Blocks
  - `unstyled`
  - `header-two`
  - `header-three`
  - `header-four`
  - `ordered-list-item`, depth: 0 or 1
  - `unordered-list-item`, depth: 0 or 1
  - `atomic`
- Inline styles
  - `BOLD`
  - `ITALIC`
- Entities
  - `LINK`, `MUTABLE` with `url` (URL), `linkType` (`page|external|email`), optionally `id` (number)
  - `DOCUMENT`, `MUTABLE` with `label` (plain text), `id` (string containing a number)
  - `IMAGE`, `IMMUTABLE` with `title` (plain text), `id` (string containing a number), `src` (URL)
  - `HORIZONTAL_RULE`, `IMMUTABLE` without data

## Using the sample content

In order to simplify using the samples across multiple projects, they are published as packages on [npm](https://www.npmjs.com/package/markov_draftjs) and [PyPI](https://pypi.python.org/pypi/markov_draftjs).

```sh
# JavaScript projects.
npm install markov_draftjs
# Python projects.
pip install markov_draftjs
```

Then, in JavaScript:

```js
const contentStates = require('markov_draftjs');
```

And in Python:

```py
from markov_draftjs import get_content_sample

content_states = get_content_sample()
```

The sample content is also available from GitHub, eg. with RawGit (warning - big file): [https://cdn.rawgit.com/thibaudcolas/markov_draftjs/44827d98/markov_draftjs/content.json](https://cdn.rawgit.com/thibaudcolas/markov_draftjs/44827d98/markov_draftjs/content.json).

## Development

> Requirements: `virtualenv`, `pyenv`, `twine`

```sh
git clone git@github.com:thibaudcolas/markov_draftjs.git
cd markov_draftjs/

# Install the git hooks.
./.githooks/deploy

# Install dependencies
nvm install
npm install

# Unarchive sample text.
cd corpora/
tar -xzvf *.tar.gz
cd ..

# Install the Python environment.
virtualenv .venv
source ./.venv/bin/activate
make init

# Install required Python versions
pyenv install --skip-existing 2.7.11
pyenv install --skip-existing 3.4.4
# Make required Python versions available globally.
pyenv global system 2.7.11 3.4.4

# Generate new sample content.
npm run start
```

## Releases

- Use `irish-pub` to confirm the content of the npm package.
- Make a new branch for the release of the new version.
- Update the [CHANGELOG](CHANGELOG.md).
- Update the version number in `markov_draftjs/__init__.py`, and `package.json`, following semver.
- Make a PR and squash merge it.
- Back on master with the PR merged, use `make publish` (confirm, and enter your password) and `npm publish`.
- Finally, go to GitHub and create a release and a tag for the new version.
- Done!

## See also

- https://github.com/jsvine/markovify
- https://github.com/catseye/Guten-gutter
