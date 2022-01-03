import json
import os

__title__ = 'markov_draftjs'
__version__ = '0.1.1'
__description__ = 'Draft.js sample content generated with Markov chains of Project Gutenberg books.'
__url__ = 'https://github.com/thibaudcolas/markov_draftjs'
__author__ = 'Thibaud Colas'
__author_email__ = 'thibaudcolas@gmail.com'
__license__ = 'MIT'
__copyright__ = 'Copyright 2017-present %s' % __author__


def get_content_sample():
    content_path = os.path.join(os.path.dirname(__file__), 'content.json')
    with open(content_path, 'r') as f:
        content = json.loads(f.read())

    return content
