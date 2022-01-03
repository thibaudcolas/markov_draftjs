import unittest

from markov_draftjs import get_content_sample


class TestMarkovDraftjs(unittest.TestCase):
    def test_get_content_sample(self):
        self.assertEqual(len(get_content_sample()), 792)
