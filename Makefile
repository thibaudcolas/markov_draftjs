.PHONY: build clean-pyc init help test-ci
.DEFAULT_GOAL := help

help: ## See what commands are available.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36mmake %-15s\033[0m # %s\n", $$1, $$2}'

init: clean-pyc ## Install dependencies and initialise for development.
	pip install --upgrade pip
	pip install -r requirements.txt

lint: ## Lint the project.
	flake8 markov_draftjs tests example.py setup.py
	isort --check-only --diff markov_draftjs tests example.py setup.py

test: ## Test the project.
	python -X dev -W error -m unittest discover

test-coverage: ## Run the tests while generating test coverage data.
	coverage run -m unittest discover && coverage report && coverage html

dev: ## Runs the example code
	python -X dev -W error example.py

clean-pyc: ## Remove Python file artifacts.
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +

build: ## Builds package for publication.
	rm -f dist/*
	python -X dev -W error -m build

publish: build ## Publishes a new version to pypi.
	twine upload dist/*
