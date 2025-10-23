import json
import os
from typing import Any, Dict, List, TypedDict

__title__ = "markov_draftjs"
__version__ = "2.0.0"
__description__ = (
    "Draft.js sample content generated with Markov chains of Project Gutenberg books."
)
__url__ = "https://github.com/thibaudcolas/markov_draftjs"
__author__ = "Thibaud Colas"
__author_email__ = "thibaudcolas@gmail.com"
__license__ = "MIT"
__copyright__ = "Copyright 2017-present %s" % __author__


class InlineStyleRange(TypedDict):
    length: int
    offset: int
    style: str


class EntityRange(TypedDict):
    length: int
    key: int
    offset: int


class DraftBlock(TypedDict):
    key: str
    text: str
    type: str
    depth: int
    inlineStyleRanges: List[InlineStyleRange]
    entityRanges: List[EntityRange]
    data: Dict[str, Any]


class Entity(TypedDict):
    type: str
    mutability: str
    data: Dict[str, Any]


class DraftContentState(TypedDict):
    entityMap: Dict[str, Entity]
    blocks: List[DraftBlock]


def get_content_sample() -> List[DraftContentState]:
    content_path = os.path.join(os.path.dirname(__file__), "content.json")
    with open(content_path, "r") as f:
        content = json.loads(f.read())

    return content
