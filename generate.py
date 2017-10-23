# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals

import glob
import markovify


def read_files(files):
    file_list = []
    for file in files:
        with open(file) as f:
            file_list.append(f.read())
    return file_list


files = glob.glob('./corpora/*.txt')
corpora_files = read_files(files)
markov_models = [markovify.Text(corpus) for corpus in corpora_files]

full_model = markovify.combine(markov_models)

sentence = full_model.make_short_sentence(140)

print(sentence)
